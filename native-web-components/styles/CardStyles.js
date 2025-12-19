const sheet = new CSSStyleSheet();
sheet.replaceSync(`
.mpp-card {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	background-color: var(--card-bgcolor, #fff);
	border-radius: 4px;
	box-shadow: var(--box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.35));
	color: var(--root-text-color, #565656);
	font-size: 14px;
	line-height: 24px;
	overflow: hidden;
    margin-bottom: 20px;
}

.mpp-card--header {
	background: var(--card-header-bgcolor, #6c757d);
	color: #fff;
	position: relative;
	display: flex;
	align-items: center;
	padding: 10px 16px;
}

.mpp-card--header h3 {
    margin: 0;
    font-size: 18px;
}

.mpp-card--body {
	margin-bottom: auto;
	padding: 16px;
}

.mppw-centered {
    text-align: center;
}

.mb-medium {
    margin-bottom: 8px;
}
`);
export default sheet;
