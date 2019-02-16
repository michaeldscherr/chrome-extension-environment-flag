chrome.storage.sync.get(['config'], ({ config }) => {
    let match = config.find((entry) => {
        let regex = RegExp(`${entry.domain}\/?$`);

        return regex.test(window.location.origin);
    });

    if (!match) return;

    let node = document.createElement('div');
    let nodeStyleProperties = {
        'background-color': match.color,
        height: '25px',
        left: '5px',
        opacity: 0.5,
        'pointer-events': 'none',
        position: 'fixed',
        top: '5px',
        width: '25px',
        'z-index': '999999',
    };
    let nodeStyle = Object.entries(nodeStyleProperties)
        .map(([key, value]) => {
            return `${key}: ${value}`;
        })
        .join('; ');

    node.setAttribute('style', nodeStyle);
    node.setAttribute('class', 'chrome-extension-environment-flag');

    document.body.appendChild(node);
});
