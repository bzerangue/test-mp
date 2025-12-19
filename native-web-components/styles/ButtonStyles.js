const sheet = new CSSStyleSheet();
sheet.replaceSync(`
.mppw-btn {
    background: var(--form-btn-primary-bgcolor, #4a95ec);
    border-radius: 4px;
    border: 0;
    box-shadow: var(--box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.35));
    display: inline-block;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    padding: 8px 16px;
    text-decoration: none;
    text-align: center;
}

.mppw-btn:hover,
.mppw-btn:focus {
    background: var(--form-btn-primary-hover, #4684ca);
    color: #fff;
}

.mppw-btn:active {
    background: var(--form-btn-primary-active, #4273aa);
    color: #fff;
}

.mppw-btn:disabled {
    background: var(--form-btn-disabled, #657783);
    cursor: not-allowed;
    opacity: 0.5;
}

.mppw-btn.primary {
    margin-left: 8px;
}

.mppw-btn.secondary {
    background: var(--form-btn-secondary-bgcolor, #fff);
    border: 1px solid var(--form-btn-secondary-text, #384249);
    box-shadow: none;
    color: var(--form-btn-secondary-text, #384249);
    font-weight: bold;
}

.mppw-btn.secondary:hover,
.mppw-btn.secondary:focus {
    background: var(--form-btn-secondary-hover, #f6f7f9);
}

.mppw-btn.secondary:active {
    background: var(--form-btn-secondary-active, #ededed);
}

.mppw-right {
    text-align: right;
}
`);
export default sheet;
