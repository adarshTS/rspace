# Percy Visual Testing Demo (Single HTML)

This demo is a single, self-contained HTML file designed to showcase rich visual complexity for Percy visual testing: multiple views (Login, Dashboard, Logout), diverse UI elements, CSS-only animations, and a global animation pause toggle for consistent screenshots.

## Features
- Three views in one file: Login, Dashboard, Logout confirmation
- Rich UI: buttons, inputs, cards, tables, charts, badges, progress bars, modals, dropdowns, tooltips
- CSS animations (spinning logo, bar pulsation, floating bars, shimmer line)
- Global animation pause (`Toggle Animations` button) adds/removes `.animations-paused`
- Responsive for desktop widths (light tweaks under 1024px)

## Run Locally
- Open `index.html` directly in a browser, or serve locally:

```zsh
python3 -m http.server 8080 --directory /Users/adarsh/Documents/percy/web/rspace
open http://localhost:8080/index.html
```

## Percy Tips
- Use the `Toggle Animations` button to freeze CSS animations before snapshots.
- Navigate through views and take snapshots per page (e.g., `Login`, `Dashboard`, `Logout`).
- Experiment with the `Color Scheme` dropdown to observe subtle visual diffs.
