const sheet = new CSSStyleSheet();
sheet.replaceSync(`
:host {
    --root-text-color: #565656;
    --root-font-size: 14px;
    --root-line-height: 24px;
    --primary: #2196f3;
    --secondary: #88a0af;
    --form-field-bgcolor: #f9f9f9;
    --form-field-border: #b4c5cf;
    --form-field-border--active: #2196f3;
    --form-valid: #42bc34;
    --form-invalid: #dc3545;
    --form-btn-primary-text: #fff;
    --form-btn-primary-bgcolor: #4a95ec;
    --form-btn-primary-hover: #4684ca;
    --form-btn-primary-active: #4273aa;
    --form-btn-secondary-text: #384249;
    --form-btn-secondary-bgcolor: #fff;
    --form-btn-secondary-hover: #f6f7f9;
    --form-btn-secondary-active: #ededed;
    --form-btn-disabled: #657783;
    --card-bgcolor: #fff;
    --card-title-color: #696969;
    --card-header-bgcolor: #6c757d;
    --box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
    --progress-pledged: #1b88b0;
    --progress-received: #000;
}
* {
    box-sizing: border-box; 
    font-family: sans-serif;
}
`);
export default sheet;
