/**
 * List of available actions for the dropdown
 */
export const AVAILABLE_ACTIONS = [
    { value: 'scrollToTop', label: 'Scroll to Top' },
    { value: 'scrollToBottom', label: 'Scroll to Bottom' },
    { value: 'scrollUp', label: 'Scroll Up' },
    { value: 'scrollDown', label: 'Scroll Down' },
    { value: 'closeTab', label: 'Close Tab', background: true }, // background: true means it needs background script
    { value: 'duplicateTab', label: 'Duplicate Tab', background: true },
    { value: 'newTab', label: 'New Tab', background: true },
    { value: 'goBack', label: 'History Back' },
    { value: 'goForward', label: 'History Forward' },
    { value: 'reload', label: 'Reload Page' },
];
