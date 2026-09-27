# Samantha Angela J — portfolio

Plain HTML/CSS/JS. No build step, no libraries.

## Files
- `content.js` — ALL text + project list. Edit here.
- `index.html` / `style.css` / `main.js` — layout, look, interactions.
- `assets/work/<project>/` — images and videos per project.
- `assets/cv.pdf` — the CV behind the "Download CV" button.

## Filling it in
1. Search `content.js` for `[[` — every one is a TO-DO (shows pink on the site).
2. Drop media into `assets/work/<project>/` using the file names listed in `content.js`
   (or change the names there). Missing files show a dashed placeholder with the expected path.
3. Images: JPG, ~2000px wide, under 500 KB (squoosh.app). Videos: MP4, under 10 MB, no sound needed.
4. Reorder projects by moving the `{ ... }` blocks in `PROJECTS`.

## Preview locally
Double-click `index.html`, or run `python3 -m http.server` in this folder and open http://localhost:8000

## Publish (free)
Go to https://app.netlify.com/drop and drag this whole folder in. Done — you get a URL.
Later: connect a custom domain in Netlify settings.
