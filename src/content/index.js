import { getShortcuts } from '../utils/storage';
import { AVAILABLE_ACTIONS } from '../utils/actions';

console.log('Shortkey content script loaded');

let shortcuts = [];
let keyBuffer = [];
let bufferTimeout;

const BUFFER_TIMEOUT_MS = 1000;

// Load shortcuts
const loadShortcuts = async () => {
    shortcuts = await getShortcuts();
    // Pre-process shortcuts?
    console.log('Shortkey: loaded shortcuts', shortcuts);
};

// Listen for updates
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.shortcuts) {
        loadShortcuts();
    }
});

loadShortcuts();

// Key Listener
document.addEventListener('keydown', (e) => {
    // Ignore if inside an input/textarea (unless we add valid-in-input feature later)
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        return;
    }

    // Build key string
    const parts = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');
    if (e.metaKey) parts.push('meta'); // command

    // Clean key name (e.g. " " -> "space")
    let key = e.key.toLowerCase();
    if (key === ' ') key = 'space';
    if (key === 'control' || key === 'alt' || key === 'shift' || key === 'meta') return; // Ignore modifier only press

    parts.push(key);
    const combo = parts.join('+');

    handleInput(combo, e);
});

function handleInput(combo, e) {
    // Check for exact match first
    if (checkMatch(combo, e)) return;

    // Handle sequences (naive implementation)
    keyBuffer.push(combo);
    if (keyBuffer.length > 5) keyBuffer.shift(); // Keep buffer small

    // Reset buffer timer
    clearTimeout(bufferTimeout);

    // Check buffer for matches (e.g. "g g")
    // We check from the end of the buffer (longest match first)
    const bufferString = keyBuffer.join(' '); // e.g., "g g"
    if (checkMatch(bufferString, e)) {
        keyBuffer = []; // Clear buffer on match
        return;
    }

    // Set timeout to clear buffer
    bufferTimeout = setTimeout(() => {
        keyBuffer = [];
    }, BUFFER_TIMEOUT_MS);
}

function checkMatch(keyString, e) {
    const match = shortcuts.find(s => s.key === keyString);
    if (match) {
        console.log('Shortkey matched:', match.label);
        e.preventDefault();
        e.stopPropagation();
        executeAction(match.action);
        return true;
    }
    return false;
}

function executeAction(actionName) {
    const actionDef = AVAILABLE_ACTIONS.find(a => a.value === actionName);

    if (!actionDef) {
        console.warn('Unknown action:', actionName);
        return;
    }

    if (actionDef.background) {
        // Send to background
        chrome.runtime.sendMessage({ type: 'EXECUTE_ACTION', action: actionName });
    } else {
        // Execute locally
        executeLocalAction(actionName);
    }
}

function executeLocalAction(action) {
    switch (action) {
        case 'scrollToTop':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'scrollToBottom':
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
        case 'scrollUp':
            window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
            break;
        case 'scrollDown':
            window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
            break;
        case 'goBack':
            window.history.back();
            break;
        case 'goForward':
            window.history.forward();
            break;
        case 'reload':
            window.location.reload();
            break;
        default:
            console.warn('Unknown local action:', action);
    }
}
