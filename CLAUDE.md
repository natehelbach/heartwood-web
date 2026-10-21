# heartwood-web

React (Vite) port of the Heartwood website designed in Claude Design
(project 0d58ad49-52bb-4b32-bd32-1ab3bbfde4ea, `ui_kits/website/`).

## Git branches

- Work on and push to the `dev` branch only.
- Never push, merge or rebase into `main` (master). The owner controls all pushes and merges to `main`.
- If something needs to reach `main` before `dev`, stop and get the owner's explicit sign-off first.

## Design sync

- Each page in `src/pages/` is a hand port of the matching `.dc.html` file; style strings are kept verbatim via `sx()` and `Hv` in `src/design/ui.jsx`.
- The Claude Design connector can't download files over 256 KB, so images come from the owner's downloads of the design project on the OneDrive Desktop (`webassets_N/project/assets/`, newest N). Copy them into `public/assets/` at the same paths, resized and compressed.
- Photos are served as compressed JPEG (max 2000px, about quality 74–82), even where the design uses a `.png` name, and the code references the `.jpg` (e.g. `HW_517-W-Main_Corner.png` → `.jpg`). When a design change names a `.png` photo, check `public/assets/` for the `.jpg` first. Keep PNG only for logos, icons, drawings and images that need transparency.
- Built JS/CSS go to `/_app/` (cached for a year by `vercel.json`); `public/assets/` images get a one-day cache, so replace an image under a new name if it must update at once.
