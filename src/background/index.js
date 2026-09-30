console.log('Shortkey background script loaded');

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'EXECUTE_ACTION') {
        handleAction(request.action, sender.tab);
    }
});

function handleAction(action, tab) {
    switch (action) {
        case 'closeTab':
            if (tab && tab.id) {
                chrome.tabs.remove(tab.id);
            }
            break;
        case 'duplicateTab':
            if (tab && tab.id) {
                chrome.tabs.duplicate(tab.id);
            }
            break;
        case 'newTab':
            chrome.tabs.create({});
            break;
        default:
            console.warn('Unknown background action:', action);
    }
}
