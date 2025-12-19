const sheet = new CSSStyleSheet();
sheet.replaceSync(`
.mppw-alert {
    border: 1px solid silver;
    border-radius: 4px;
    padding: 8px;
    color: var(--root-text-color, #565656);
    font-size: 10pt;
    line-height: 20px;
    vertical-align: middle;
    display: block;
    margin-top: 15px;
    margin-bottom: 15px;
}

.mppw-alert__danger {
    background: #f5dbd9;
    border: 1px solid #f8b7b6;
    color: #721c24;
}

.mppw-alert__text {
    padding-left: 5px;
}
`);
export default sheet;
