CHICKEN — UPDATED LOCAL SCRAMJET BUILD

IMPORTANT
The previous static method used https://hahahah67-pixel.github.io/scramjet-static/.
That deployment currently returns a GitHub Pages 404, so this build no longer references it.

THIS BUILD
- Uses the current Scramjet 2.x controller/service-worker architecture.
- Runs Wisp locally at /wisp/.
- Uses Libcurl by default and includes Epoxy as the alternate transport.
- Serves Scramjet, controller, transport, and utility browser assets from the local server.
- Keeps the Chicken UI and existing tabs/settings.
- Keeps the supplied GameID.html unchanged.
- Keeps the supplied ad-blocker files unchanged.
- Keeps the Dino game in its custom internal window.

STARTING
1. Install Node.js 20 or newer.
2. Double-click Start Chicken.bat.
3. Leave the server window open.
4. Use the browser window that opens at http://localhost:8080/.
5. Do NOT double-click index.html directly.

GITHUB PAGES
GitHub Pages can host the Chicken front end, but it cannot provide the local Wisp WebSocket server this Scramjet build needs. The proxy portion must run on localhost or another server that can keep a WebSocket open.
