const sheet = new CSSStyleSheet();
sheet.replaceSync(`
.mppw-spinner {
    border: 5px solid var(--primary, #2196f3);
    border-top-color: #fff;
    border-radius: 50%;
    display: block;
    width: 60px;
    height: 60px;
    transition-property: transform;
    animation: rotate 1.25s infinite linear;
    margin: 48px auto;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`);
export default sheet;
