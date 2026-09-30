# ⚡ Shortkey

> **Custom keyboard shortcuts for your browser.** Boost your productivity with Vim-like key sequences and custom browser hotkeys.

[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?logo=googlechrome&logoColor=white)](#)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](#)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Shortkey is a lightweight, modern Google Chrome extension that lets you bind keyboard shortcuts and key sequences to browser navigation and tab controls. Built with **React 19**, **Vite**, and **CRXJS**, it features an interactive key recorder, multi-key sequence detection, and synchronized cross-device settings.

---

## ✨ Features

- 🎹 **Single & Combination Hotkeys**: Bind modifiers like `Ctrl`, `Alt`, `Shift`, and `Cmd` (`Meta`) to any key.
- 🔁 **Multi-Key Sequences**: Supports Vim-style chained keystrokes (e.g., `g g` to scroll to top).
- 🎙️ **Interactive Key Recorder**: Simply focus the input and press your desired shortcut—no manual string typing needed.
- 📑 **Tab & Navigation Automation**:
  - **Navigation**: Scroll to Top, Scroll to Bottom, Scroll Up, Scroll Down, History Back, History Forward, Page Reload.
  - **Tab Controls**: Close Current Tab, Duplicate Tab, Create New Tab.
- 🛡️ **Input-Aware**: Automatically ignores hotkeys while typing in text inputs, textareas, and content-editable areas.
- ☁️ **Chrome Cloud Sync**: All shortcut definitions sync across your Chrome instances using `chrome.storage.sync`.
- 🎨 **Sleek Dark Theme**: Clean, responsive UI with emerald green accents and instant feedback.

---

## 🚀 Default Shortcuts

| Shortcut | Action | Description | Scope |
| :--- | :--- | :--- | :--- |
| `g g` | **Scroll to Top** | Smoothly scrolls to the top of the current page | In-Page |
| `G` (`Shift + G`) | **Scroll to Bottom** | Smoothly scrolls to the very bottom of the page | In-Page |
| `Alt + W` | **Close Tab** | Closes the active browser tab | Background |
| `Alt + D` | **Duplicate Tab** | Duplicates the active browser tab | Background |
| `Alt + T` | **New Tab** | Opens a fresh blank tab | Background |

*All shortcuts can be modified, re-bound, or removed in the Shortkey Settings page.*

---

## 📦 Installation & Setup

### Option 1: Load Pre-Built Extension (Fastest)

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** via the toggle switch in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the `dist/` directory inside this repository.
6. The Shortkey icon will appear in your Chrome toolbar!

---

### Option 2: Build from Source

#### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `pnpm`

#### 1. Clone the repository
```bash
git clone https://github.com/TJeyesh/shortkey.git
cd shortkey
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Run development server (with HMR)
```bash
npm run dev
```

#### 4. Build for production
```bash
npm run build
```
The output extension bundle will be generated in the `dist/` folder. Load `dist/` into Chrome as an unpacked extension.

---

## 🛠️ Project Structure

```text
shortkey/
├── dist/                  # Compiled Chrome extension ready for loading
├── public/                # Static assets (icons, vite.svg)
├── src/
│   ├── assets/            # Extension icons and graphics
│   ├── background/        # Service worker for background tab operations
│   │   └── index.js
│   ├── content/           # Injected content script for keystroke listening
│   │   └── index.js
│   ├── manifest.json      # Manifest V3 configuration
│   ├── options/           # Options / settings page (React SPA)
│   │   ├── App.jsx
│   │   ├── KeyRecorder.jsx
│   │   ├── index.html
│   │   └── main.jsx
│   ├── popup/             # Extension toolbar popup (React SPA)
│   │   ├── App.jsx
│   │   ├── index.html
│   │   └── main.jsx
│   ├── utils/
│   │   ├── actions.js     # Action registry (local vs background)
│   │   ├── keys.js        # Keystroke normalization utilities
│   │   └── storage.js     # Chrome storage sync helpers & fallbacks
│   └── index.css          # Design system & dark theme variables
├── package.json
└── vite.config.js         # Vite configuration with @crxjs/vite-plugin
```

---

## 🔒 Permissions & Security

Shortkey requires the following permissions declared in `manifest.json`:

- `storage`: Persists and synchronizes your shortcut preferences across devices via `chrome.storage.sync`.
- `tabs`: Allows the extension to manage tab actions (close, duplicate, new tab).
- `activeTab`: Provides safe interaction with the currently active page.
- `scripting`: Enables execution of navigation commands on web pages.
- `<all_urls>`: Needed to listen for configured shortcuts across web pages.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new actions or improvements:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
