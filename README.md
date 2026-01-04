# CivicNest

CivicNest includes two demo apps:
- `civicnest-demo`: React (Vite) web demo.
- `civicnest-native`: Expo / React Native demo for simulator and real device testing.

## Prerequisites
- Node.js 18+ and npm
- For iOS simulator: Xcode installed
- For Android emulator: Android Studio + emulator setup

## Clone

```bash
git clone git@github.com:ankitshah692/civicnest.git
cd civicnest
```

## Web demo (Vite)

```bash
cd civicnest-demo
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

Build for production:

```bash
npm run build
```

## Expo / React Native demo

```bash
cd civicnest-native
npm install
npm start
```

In the Expo CLI window:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator

Optional (real phone): Install **Expo Go** and scan the QR code from the Expo CLI.

## Notes
- Landing screen lets you pick App or Kiosk mode.
- Kiosk mode shows Frisco, TX kiosk locations before entering Home.
- Accessibility controls (high contrast, text size, voice) are available in the header.
