/**
 * MPWidgets Loader
 */

const WIDGET_REGISTRY = {
    'mpp-user-login': () => import('./components/UserLogin.js'),
};

const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
};

const widgetObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tagName = entry.target.tagName.toLowerCase();
            const importFn = WIDGET_REGISTRY[tagName];

            if (importFn) {
                console.log(`MPWidgets: Lazy loading ${tagName}...`);
                importFn()
                    .then(() => {
                        console.log(`MPWidgets: ${tagName} loaded.`);
                        observer.unobserve(entry.target);
                    })
                    .catch(err => console.error(`MPWidgets: Failed to load ${tagName}`, err));
            }
        }
    });
}, observerOptions);

function initLoader() {
    Object.keys(WIDGET_REGISTRY).forEach(tagName => {
        const elements = document.querySelectorAll(tagName);
        elements.forEach(el => widgetObserver.observe(el));
    });

    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && WIDGET_REGISTRY[node.tagName.toLowerCase()]) {
                    widgetObserver.observe(node);
                }
            });
        });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    console.log('MPWidgets: Loader initialized.');
}

initLoader();

export { initLoader };
