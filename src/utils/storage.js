export const DEFAULT_SHORTCUTS = [
    { id: '1', key: 'g g', action: 'scrollToTop', label: 'Scroll to Top' },
    { id: '2', key: 'G', action: 'scrollToBottom', label: 'Scroll to Bottom' },
    { id: '3', key: 'alt+w', action: 'closeTab', label: 'Close Tab' },
    { id: '4', key: 'alt+d', action: 'duplicateTab', label: 'Duplicate Tab' },
    { id: '5', key: 'alt+t', action: 'newTab', label: 'New Tab' },
];

/**
 * Get all stored shortcuts.
 * @returns {Promise<Array>}
 */
export const getShortcuts = async () => {
    if (typeof chrome === 'undefined' || !chrome.storage) {
        // Fallback for local development (outside extension)
        const local = localStorage.getItem('shortkeys_shortcuts');
        return local ? JSON.parse(local) : DEFAULT_SHORTCUTS;
    }

    const result = await chrome.storage.sync.get('shortcuts');
    return result.shortcuts || DEFAULT_SHORTCUTS;
};

/**
 * Save a new list of shortcuts.
 * @param {Array} shortcuts 
 */
export const saveShortcuts = async (shortcuts) => {
    if (typeof chrome === 'undefined' || !chrome.storage) {
        localStorage.setItem('shortkeys_shortcuts', JSON.stringify(shortcuts));
        return;
    }

    await chrome.storage.sync.set({ shortcuts });
};
