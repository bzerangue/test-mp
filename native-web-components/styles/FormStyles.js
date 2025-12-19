const sheet = new CSSStyleSheet();
sheet.replaceSync(`
.mppw-form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--form-field-border, #b4c5cf);
    background-color: var(--form-field-bgcolor, #f9f9f9);
    border-radius: 4px;
}
.mppw-form-control:focus {
    border-color: var(--form-field-border--active, #2196f3);
    outline: none;
}
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}
`);
export default sheet;
