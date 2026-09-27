// Renders content.js into the page + all interactions. No libraries.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const txt = (s) => esc(s).replace(/\[\[(.+?)\]\]/g, '<mark class="todo">$1</mark>'); // [[x]] = TODO
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover)").matches;
const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const pointer = { x: innerWidth / 2, y: innerHeight / 3 };
addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; });

/* ---------- fill content ---------- */
$("#roles").textContent = SITE.roles.join("  ·  ");
$("#first").textContent = SITE.first;
$("#last").textContent = SITE.last;
$("#intro").innerHTML = txt(SITE.intro);
{
  // statement: split into words so they can drift in one after another
  const hi = "something you can step inside";
  let i = 0;
  const words = (s, em) => s.split(" ").filter(Boolean).map((w) => `<span class="w" style="--i:${i++}">${em ? "<em>" + esc(w) + "</em>" : esc(w)}</span>`).join(" ");
  const [before, after = ""] = SITE.statement.includes(hi) ? SITE.statement.split(hi) : [SITE.statement];
  $("#statement-text").innerHTML = `<span class="w spark" style="--i:${i++}">✦</span> ` + words(before) +
    (SITE.statement.includes(hi) ? " " + words(hi, true) + " " + words(after) : "");
  const st = $("#statement");
  if (reduced) st.classList.add("is-in");
  else new IntersectionObserver(([e], o) => { if (e.isIntersecting) { st.classList.add("is-in"); o.disconnect(); } }, { threshold: .35 }).observe(st);
}
$("#langs").textContent = LANGUAGES;
$("#cvlink").href = SITE.cv;
$("#mail").href = "mailto:" + SITE.email;
$("#mail").textContent = SITE.email;
$("#year").textContent = new Date().getFullYear();
$("#links").innerHTML = `
  <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
  ${[SITE.instagram, SITE.studioInstagram].filter(Boolean).map((h) => `<a href="https://instagram.com/${h}" target="_blank" rel="noopener">@${esc(h)}</a>`).join("")}
  <span>${esc(SITE.based)}</span>`;
$("#skills").innerHTML = Object.entries(SKILLS)
  .map(([k, v]) => `<div><h3>${esc(k)}</h3><p>${v.map(esc).join(" · ")}</p></div>`).join("");
$("#index").innerHTML = PROJECTS.map((p, i) => `<li><a class="row" href="#work/${p.id}" data-id="${p.id}" data-cursor="view">
    <span class="row__n">${roman[i]}</span>
    <span class="row__t">${esc(p.short)}<em>${esc(p.title)}</em></span>
    <span class="row__tag">${esc(p.tag)}</span>
    <span class="row__y">${esc(p.year)}</span></a></li>`).join("");

/* ---------- featured project ---------- */
if (typeof FEATURED !== "undefined") {
  const p = PROJECTS.find((q) => q.id === FEATURED.id);
  if (p) {
    $("#featured").innerHTML = `
      <a class="featured__card" href="#work/${p.id}" data-cursor="view">
        <div class="featured__media-wrap">
        <svg class="featured__eye" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden="true"><path d="M4 45Q80-22 156 45Q80 112 4 45Z"/></svg>
        <div class="featured__media">
          <img src="${FEATURED.poster}" alt="${esc(p.title)}">
          ${FEATURED.video ? `<video src="${FEATURED.video}" muted loop autoplay playsinline preload="metadata" poster="${FEATURED.poster}"></video>` : ""}
          <span class="featured__badge">${FEATURED.video ? "▶ Mixed-reality prototype" : "Mixed-reality prototype"}</span>
        </div>
        </div>
        <div class="featured__text">
          <p class="eyebrow">${esc(FEATURED.label)}</p>
          <h3>${esc(p.title)}</h3>
          <p class="line">${txt(FEATURED.line)}</p>
          ${(FEATURED.facts || []).length ? `<ul class="featured__facts">${FEATURED.facts.map((f) => `<li>${txt(f)}</li>`).join("")}</ul>` : ""}
          <span class="featured__cta">View the case study →</span>
        </div>
      </a>`;
    const v = $("#featured video");
    if (v) v.addEventListener("error", () => v.remove()); // no video file yet → keep the poster image
    // clicking the eye: the new page opens from the centre of the eye, like a pupil dilating
    const card = $("#featured .featured__card"), media = $("#featured .featured__media");
    card.addEventListener("click", (e) => {
      if (reduced || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const r = media.getBoundingClientRect();
      const at = `at ${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`;
      caseEl.classList.add("is-pupil");
      caseEl.style.clipPath = `circle(0px ${at})`;
      location.hash = card.getAttribute("href"); // opens the case study (hidden behind the clip)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        caseEl.style.transition = "clip-path 2s cubic-bezier(.65,0,.25,1)";
        caseEl.style.clipPath = `circle(150vmax ${at})`;
      }));
      setTimeout(() => { caseEl.style.clipPath = caseEl.style.transition = ""; }, 2100);
    });
  }
}

/* ---------- night sky: nebula + twinkling four-point stars ---------- */
{
  const cv = $("#sky"), ctx = cv.getContext("2d");
  let W, H, stars = [], px = 0, py = 0;
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((W * H) / 5000);
    stars = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      s: i % 14 === 0 ? 6 + Math.random() * 10 : Math.random() * 1.4 + .3, // a few big sparkles
      d: Math.random() * .6 + .2, // depth, for parallax
      t: Math.random() * 6.28, sp: .5 + Math.random() * 1.5,
      c: ["#fff6de", "#c9d3ff", "#ffc2d6", "#f3dc9b"][i % 4],
    }));
  };
  size(); addEventListener("resize", size);
  const sparkle = (x, y, r) => {
    ctx.beginPath();
    ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x + r * .12, y - r * .12, x + r, y);
    ctx.quadraticCurveTo(x + r * .12, y + r * .12, x, y + r); ctx.quadraticCurveTo(x - r * .12, y + r * .12, x - r, y);
    ctx.quadraticCurveTo(x - r * .12, y - r * .12, x, y - r); ctx.fill();
  };
  const blobs = [["107,124,255", .25, .3, .45], ["255,93,143", .8, .7, .4], ["74,31,110", .6, .2, .5], ["243,220,155", .5, .55, .22]];
  const draw = (t) => {
    t /= 1000;
    px += ((pointer.x / innerWidth - .5) - px) * .04; py += ((pointer.y / innerHeight - .5) - py) * .04;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (const [c, bx, by, br] of blobs) {
      const x = (bx + Math.sin(t * .07 + bx * 9) * .06 - px * .05) * W;
      const y = (by + Math.cos(t * .06 + by * 9) * .06 - py * .05) * H;
      const g = ctx.createRadialGradient(x, y, 0, x, y, br * Math.max(W, H));
      g.addColorStop(0, `rgba(${c},.16)`); g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    ctx.globalCompositeOperation = "source-over";
    for (const s of stars) {
      const a = .35 + .65 * (.5 + .5 * Math.sin(t * s.sp + s.t));
      const x = s.x - px * 40 * s.d, y = s.y - py * 40 * s.d;
      ctx.globalAlpha = a; ctx.fillStyle = s.c;
      if (s.s > 4) { ctx.shadowColor = s.c; ctx.shadowBlur = 12; sparkle(x, y, s.s * (.7 + .3 * a)); ctx.shadowBlur = 0; }
      else { ctx.beginPath(); ctx.arc(x, y, s.s, 0, 6.28); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}

/* ---------- the eye: lashes, iris lines, follows the cursor, blinks ---------- */
{
  const eye = $("#eye"), iris = $("#iris"), NS = "http://www.w3.org/2000/svg";
  const line = (parent, x1, y1, x2, y2) => {
    const l = document.createElementNS(NS, "line");
    Object.entries({ x1, y1, x2, y2 }).forEach(([k, v]) => l.setAttribute(k, v.toFixed(1)));
    parent.appendChild(l);
  };
  // lashes along the upper lid (curve M-170 0 Q0 -120 170 0), fanning outward
  for (let i = 1; i < 16; i++) {
    const t = i / 16, x = (1 - t) ** 2 * -170 + t ** 2 * 170, y = 2 * (1 - t) * t * -120;
    const len = 26 + Math.sin(t * Math.PI) * 22;
    line($("#lashes"), x, y, x + (x / 170) * 18, y - len);
  }
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * 6.283;
    line($("#irisLines"), Math.cos(a) * 24, Math.sin(a) * 24, Math.cos(a) * 56, Math.sin(a) * 56);
  }
  let ix = 0, iy = 0;
  const follow = () => {
    const r = eye.getBoundingClientRect();
    const dx = pointer.x - (r.left + r.width / 2), dy = pointer.y - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 500);
    ix += ((dx / d) * 70 * k - ix) * .12; iy += ((dy / d) * 30 * k - iy) * .12;
    iris.setAttribute("transform", `translate(${ix.toFixed(1)} ${iy.toFixed(1)})`);
    requestAnimationFrame(follow);
  };
  const blink = () => {
    eye.classList.add("is-blink");
    setTimeout(() => eye.classList.remove("is-blink"), 140);
    setTimeout(blink, 2800 + Math.random() * 4200);
  };
  if (!reduced) { follow(); setTimeout(blink, 2200); }
}

/* ---------- studio wall: pinned, draggable ---------- */
{
  const board = $("#board");
  const notes = {
    now: `<p class="paper__label">currently</p><p>${txt(SITE.now)}</p>`,
    places: `<p class="paper__label">experience across</p><p>Sweden · Mexico · Argentina · Spain · Poland</p>`,
  };
  const items = WALL.map((w, i) => {
    const el = document.createElement(w.img ? "figure" : "article");
    el.className = "pinned " + (w.img ? "polaroid" : "paper" + (w.note === "places" ? " paper--night" : ""));
    el.style.setProperty("--r", w.r + "deg");
    el.dataset.cursor = "drag";
    el.innerHTML = `<span class="pin"></span>` + (w.img
      ? `<img src="${w.img}" alt="${esc(w.caption)}" draggable="false"><figcaption>${esc(w.caption)}</figcaption>`
      : notes[w.note]) + (i === 0 ? `<span class="drag-hint" id="hint" aria-hidden="true">↶ drag me!</span>` : "");
    if (w.pos) el.style.setProperty("--pos", w.pos);
    if (i === 0) el.style.zIndex = 5;
    if (w.w) el.style.width = `min(${Math.round(w.w * 100)}%, 260px)`;
    board.appendChild(el);
    return { el, w };
  });
  const place = () => items.forEach(({ el, w }) => {
    const phone = matchMedia("(max-width: 860px)").matches; // mx / my = position on phones
    const x = phone && w.mx != null ? w.mx : w.x, y = phone && w.my != null ? w.my : w.y;
    el.style.left = x * (board.clientWidth - el.offsetWidth) + "px";
    el.style.top = (phone ? 44 : 60) + y * (board.clientHeight - el.offsetHeight - (phone ? 56 : 80)) + "px";
  });
  place(); addEventListener("load", place); // again once images have their size

  let z = 10, touched = false;
  const hint = $("#hint");
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !touched) { items[0].el.classList.add("nudge"); io.disconnect(); }
  }, { threshold: .5 });
  io.observe(board);

  items.forEach(({ el }) => {
    let sx, sy, ox, oy;
    el.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      e.preventDefault(); el.setPointerCapture(e.pointerId);
      if (!touched) { touched = true; hint && hint.classList.add("is-gone"); }
      const h = document.createElement("span"); h.className = "hole";
      h.style.left = el.offsetLeft + el.offsetWidth / 2 + "px"; h.style.top = el.offsetTop + 3 + "px";
      board.appendChild(h);
      const holes = board.querySelectorAll(".hole"); if (holes.length > 14) holes[0].remove();
      el.classList.remove("nudge", "is-pinned"); el.classList.add("is-lifted"); el.style.zIndex = ++z;
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
    });
    el.addEventListener("pointermove", (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      el.style.left = Math.min(Math.max(ox + e.clientX - sx, -20), board.clientWidth - el.offsetWidth + 20) + "px";
      el.style.top = Math.min(Math.max(oy + e.clientY - sy, 10), board.clientHeight - el.offsetHeight + 20) + "px";
    });
    const drop = () => {
      if (!el.classList.contains("is-lifted")) return;
      el.classList.remove("is-lifted");
      el.style.setProperty("--r", (Math.random() * 8 - 4).toFixed(1) + "deg");
      el.classList.add("is-pinned");
    };
    el.addEventListener("pointerup", drop); el.addEventListener("pointercancel", drop);
  });
}

/* ---------- cursor ---------- */
const cursor = $(".cursor"), clabel = $(".cursor__label");
if (finePointer) {
  addEventListener("pointermove", (e) => { cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("a, button, .pinned");
    cursor.classList.toggle("is-big", !!t);
    clabel.textContent = t?.dataset.cursor;
  });
}

/* ---------- framed hover preview on the work index ---------- */
{
  const preview = $("#preview"), img = $(".preview__img");
  let x = 0, y = 0, on = false;
  document.querySelectorAll(".row").forEach((row) => {
    const p = PROJECTS.find((q) => q.id === row.dataset.id);
    const cover = p.media.find((m) => m.type !== "video");
    row.addEventListener("pointerenter", () => {
      img.style.backgroundImage = cover ? `url("${cover.src}")` : "none";
      preview.classList.add("is-on"); on = true;
    });
    row.addEventListener("pointerleave", () => { preview.classList.remove("is-on"); on = false; });
  });
  const loop = () => {
    x += (pointer.x - x) * .15; y += (pointer.y - y) * .15;
    if (on) { preview.style.left = x + "px"; preview.style.top = y + "px"; }
    requestAnimationFrame(loop);
  };
  if (finePointer) loop();
}

/* ---------- case study overlay (hash routed: #work/<id>) ---------- */
const caseEl = $("#case"), inner = $("#case-inner");
const baseTitle = document.title;

// YouTube: accepts a full link (youtube.com/watch?v=…, youtu.be/…, /shorts/…) or just the video ID
const youtubeId = (s) => (String(s).match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/) || String(s).match(/^([\w-]{11})$/) || [])[1];

const mediaHTML = (m) => {
  if (m.type === "youtube") {
    const id = youtubeId(m.src);
    const el = id
      ? `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1" title="${esc(m.caption.replace(/\[\[|\]\]/g, ""))}" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
      : `<div class="ph">Paste a YouTube link in content.js<br><b>src: "https://youtu.be/…"</b></div>`;
    return `<figure class="is-video"><div class="frame">${el}</div><figcaption>${txt(m.caption)}</figcaption></figure>`;
  }
  const fallback = `<div class='ph'>Add file:<br><b>${esc(m.src)}</b></div>`;
  const alt = esc(m.caption.replace(/\[\[|\]\]/g, ""));
  const el = m.type === "video"
    ? `<video src="${m.src}" muted loop playsinline autoplay controls preload="metadata" onerror="this.outerHTML=&quot;${fallback}&quot;"></video>`
    : `<img src="${m.src}" alt="${alt}" loading="lazy" onerror="this.outerHTML=&quot;${fallback}&quot;">`;
  return `<figure class="${m.type === "video" ? "is-video" : ""}"><div class="frame">${el}</div><figcaption>${txt(m.caption)}</figcaption></figure>`;
};

// "stack" = one big picture per row · "masonry" = packed columns. Set GALLERY_STYLE in content.js
const galleryStyle = () => (typeof GALLERY_STYLE !== "undefined" && GALLERY_STYLE === "masonry" ? "masonry" : "stack");

// masonry: keep reading order (left → right), drop each picture into the shortest column; videos get a full-width row
function layoutMasonry(box) {
  if (!box._figs) box._figs = [...box.querySelectorAll("figure")];
  const max = innerWidth < 560 ? 1 : innerWidth < 960 ? 2 : 3;
  box.textContent = "";
  // split into groups of pictures, separated by full-width videos
  const groups = [[]];
  for (const f of box._figs) f.classList.contains("is-video") ? groups.push(f, []) : groups[groups.length - 1].push(f);
  for (const g of groups) {
    if (!Array.isArray(g)) { box.appendChild(g); continue; }
    if (!g.length) continue;
    const n = Math.min(max, g.length); // 2 pictures → 2 columns, no empty gap
    const row = document.createElement("div"); row.className = "m-row";
    const cols = Array.from({ length: n }, () => row.appendChild(Object.assign(document.createElement("div"), { className: "m-col" })));
    const hs = cols.map(() => 0);
    for (const f of g) {
      const img = f.querySelector("img"), ratio = img && img.naturalWidth ? img.naturalHeight / img.naturalWidth : 1;
      const i = hs.indexOf(Math.min(...hs));
      cols[i].appendChild(f); hs[i] += ratio + 0.12; // 0.12 ≈ caption + gap
    }
    box.appendChild(row);
  }
}
function setupMasonry(box) {
  if (!box) return;
  let t; const again = () => { clearTimeout(t); t = setTimeout(() => layoutMasonry(box), 60); };
  layoutMasonry(box);
  box.querySelectorAll("img").forEach((im) => im.complete || im.addEventListener("load", again, { once: true }));
  addEventListener("resize", again);
}

function openCase(id) {
  const i = PROJECTS.findIndex((p) => p.id === id);
  if (i < 0) return closeCase();
  const p = PROJECTS[i], n = (i + 1) % PROJECTS.length, next = PROJECTS[n];
  inner.innerHTML = `
    <p class="eyebrow">${roman[i]} — ${esc(p.tag)} — ${esc(p.year)}</p>
    <h1 id="case-title">${esc(p.title)}</h1>
    <dl class="case__meta">${Object.entries(p.meta).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${txt(v)}</dd></div>`).join("")}</dl>
    <div class="case__body">
      <div><h2>The brief</h2><p class="brief">${txt(p.brief)}</p></div>
      <div>
        <h2>What I did</h2><ul>${p.did.map((d) => `<li>${txt(d)}</li>`).join("")}</ul>
        <div class="case__outcome"><h2>Outcome</h2><p>${txt(p.outcome)}</p></div>
      </div>
    </div>
    <div class="pics pics--${galleryStyle()}">${p.media.map(mediaHTML).join("")}</div>
    <a class="case__next" href="#work/${next.id}" data-cursor="next"><small>Next — ${roman[n]}</small>${esc(next.title)} →</a>`;
  caseEl.hidden = false; caseEl.scrollTop = 0;
  setupMasonry(inner.querySelector(".pics--masonry"));
  document.body.style.overflow = "hidden";
  document.title = `${p.title} — Samantha Angela J`;
  $("#case-close").focus({ preventScroll: true });
}
function closeCase() {
  if (caseEl.hidden) return;
  caseEl.hidden = true; caseEl.classList.remove("is-pupil"); document.body.style.overflow = ""; document.title = baseTitle;
}
const route = () => { const m = location.hash.match(/^#work\/(.+)$/); m ? openCase(m[1]) : closeCase(); };
addEventListener("hashchange", route); route();
$("#case-close").addEventListener("click", () => { history.pushState("", "", "#work"); closeCase(); $("#work").scrollIntoView(); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !caseEl.hidden) $("#case-close").click(); });

/* ---------- top bar gets a solid background once you scroll ---------- */
{
  const bar = $(".bar");
  const onScroll = () => bar.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}
