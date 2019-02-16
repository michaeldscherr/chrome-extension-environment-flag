chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(
        {
            config: [
                {
                    domain: 'docker',
                    color: '#2496ed',
                },
            ],
        },
        null
    );
});
