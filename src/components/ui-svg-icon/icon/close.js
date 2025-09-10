export default (color = []) => {
	return `
		<svg xmlns="http://www.w3.org/2000/svg" fill="${color[0] || '#eeeeee'}" fill-rule="evenodd" viewBox="0 0 16 16" class="design-iconfont">
			<g fill="nore" fill-rule="evenodd">
			  <path transform="rotate(-45 8 8)" d="M7 -2H9V18H7z"/>
			  <path transform="scale(-1 1) rotate(-45 0 27.3137085)" d="M7 -2H9V18H7z"/>
			</g>
		</svg>
	`
}