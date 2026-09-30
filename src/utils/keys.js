/**
 * Normalizes a keyboard event into a consistent string format.
 * Format: [modifier+]+[key] (e.g., "ctrl+shift+k")
 * 
 * @param {KeyboardEvent} e 
 * @returns {string|null} The normalized key string, or null if it's just a modifier press
 */
export const normalizeKeyEvent = (e) => {
    // Ignore standalone modifier presses
    if (['control', 'alt', 'shift', 'meta'].includes(e.key.toLowerCase())) {
        return null;
    }

    const parts = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');
    if (e.metaKey) parts.push('meta');

    let key = e.key.toLowerCase();

    // Normalize special keys
    if (key === ' ') key = 'space';

    parts.push(key);
    return parts.join('+');
};
