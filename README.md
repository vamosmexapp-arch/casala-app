# Casalá — App (working skeleton)

Rentals-only web app for Guadalajara, Zapopan, and the rest of Jalisco.
Vanilla HTML/CSS/JS single-page app (same stack as VAMOS). No build step.

## What works right now
- Home with hero, AI search bar, pill filters, price min/max, floor + elevator filter
- Live result count + working filtering (beds, baths, parking, price, zone, elevator)
- Clickable property cards → detail page with gallery, specs, amenities, contact card
- **Back button returns to your exact spot** (hash routing — solves the old-portal problem)
- Favorites (♥) saved in the browser; saving prompts "create account"
- Favoritos page listing saved properties
- Map section with amenity toggles, colonia zone chips, clickable price pins

## File structure
```
casala-app/
├── index.html              ← app shell (header, footer, mounts #view)
├── css/styles.css          ← all styling (the palette lives in :root at the top)
├── js/
│   ├── data.js             ← sample listings + getListings(). Swap for Firebase later.
│   ├── app.js              ← router + all rendering & interaction logic
│   └── firebase-config.example.js  ← template for when you connect a real database
├── .gitignore
└── README.md
```

## Run it locally
You can just double-click index.html, but a tiny local server is better
(some browsers block features on file://). Two easy options:

**Option A — VS Code Live Server (recommended):**
1. Open this folder in VS Code
2. Install the "Live Server" extension (Extensions panel, search "Live Server")
3. Right-click index.html → "Open with Live Server"

**Option B — terminal:**
```bash
python3 -m http.server 5173
# then open http://localhost:5173
```

## Where to add things next
- **More/real listings:** edit the LISTINGS array in `js/data.js`
- **Connect Firebase:** copy firebase-config.example.js → firebase-config.js,
  paste your config, then replace getListings() in data.js with a Firestore query
- **New page (e.g. landlord dashboard):** add a route in the router() function in app.js
- **Colors/branding:** all in the :root block at the top of css/styles.css
