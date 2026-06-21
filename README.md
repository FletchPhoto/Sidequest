# 🎰 Sidequest

Gamble a random **sidequest to do with the boys** — little prep, done in a day.

Pull the lever, let the slot machine roll, and go do whatever mission it lands on.
It's a self-contained web app (no build, no dependencies) that installs to your
iPhone home screen and runs **full-screen and offline** like a native app.

## Features

- 🎰 **Slot-machine spin** with haptic feedback and a reveal card
- 🏅 **Rarity tiers + weighted odds** — Common / Rare / Legendary / Mythic (the rare ones feel like a jackpot, confetti and all)
- 🎚 **Vibe selector** — Wholesome · Cheeky · Full Send (pick how spicy the missions get)
- 🔎 **Filters** — time you've got, how many lads, and budget
- 💸 **Stakes & forfeits** — roll a forfeit for whoever bottles it
- ✍️ **Add your own quests** — saved on your device, mixed into the spins
- 📴 **Works offline** once installed

## Run it on your iPhone

### Option A — GitHub Pages (recommended, zero install, gives offline + home-screen app)
1. Push this repo to GitHub (this branch is fine).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**,
   pick this branch and the `/ (root)` folder, **Save**.
3. Wait ~1 min, then open the Pages URL in **Safari** on your iPhone.
4. **Share → Add to Home Screen**. Launch it from the icon — full-screen, offline, native-feel.

### Option B — Same Wi-Fi from a laptop (no internet needed)
1. In this folder, run a static server:
   ```bash
   python3 -m http.server 8000
   ```
2. Find your laptop's local IP (e.g. `192.168.1.23`).
3. On the iPhone (same Wi-Fi), open `http://192.168.1.23:8000` in Safari.
   Add to Home Screen as above if you want the app feel.

### Option C — Quick look
Just open the URL from Option A or B in any browser and tap **SPIN**.
(Offline install and haptics only kick in over `https`/`localhost` and on a real phone.)

## Make it yours

- Tap **＋** (top right) to add your own sidequests — they're stored on your device.
- Want to ship your own defaults? Edit `quests.js` — each quest is one object with
  `title`, `desc`, `rarity`, `spice`, `time`, `budget`, `minLads`. The format is
  documented at the top of that file.

## Files

| File | What it does |
|------|--------------|
| `index.html` | App shell, layout, styles |
| `app.js` | Spin logic, filters, stakes, custom-quest editor, persistence |
| `quests.js` | Built-in sidequests + forfeits (edit freely) |
| `manifest.webmanifest` | PWA metadata for home-screen install |
| `sw.js` | Service worker for offline caching |
| `icon-*.png` | App icons |

No tracking, no accounts, no server — everything lives in your browser.
