import { isProduct } from '@/config'
// 添加调试台
export const addVConsole = function() {
	if (!isProduct) {
		let src = 'https://gz-sass-1258783731.cos.ap-guangzhou.myqcloud.com/SAAS/assets/js/eruda.js'

		let script = document.createElement('script')
		script.type = 'text/javascript'
		script.onload = script.onreadystatechange = function() {
			if (
				!this.readyState ||
				this.readyState === 'loaded' ||
				this.readyState === 'complete'
			) {
				script.onload = script.onreadystatechange = null
				let script2 = document.createElement('script')
				script2.text = 'eruda.init()'
				document.documentElement.childNodes[0].appendChild(script2)
			}
		}
		script.src = src

		document.documentElement.childNodes[0].appendChild(script)
	}
}
