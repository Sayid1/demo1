import { str2param, param2str } from '@/libs/utils/url'
export default {
	data() {
		return {
			src: '',
			// 连接
			query: '',
			// 分享参数
			shareOpts: {
				imageUrl: '',
				path: '',
				title: ''
			},
			// 默认连接
			defaultUrl: ''
		}
	},
	onLoad(query) {
		this.query = query
		// 设置url
		this.setUrl()
	},
	onShareAppMessage() {
		let { shareOpts } = this

		let route = this.__route__

		return {
			...shareOpts,
			path: route + '?url=' + encodeURIComponent(shareOpts.path || this.src)
		}
	},
	methods: {
		filterUrlParams(url, keys = ['token']) {
			if (!keys) return

			let arr = []

			if (Array.isArray(keys)) {
				arr = keys
			} else {
				arr = [keys]
			}

			let query = str2param(url) || {}
			let href = url.indexOf('?') === -1 ? '' : url.split('?')[0]

			arr.forEach(v => {
				delete query[v]
			})

			return href + param2str(query)
		},
		async getToken() {
			await this.$store.dispatch('user/checkLogin')

			return encodeURIComponent(this.$store.getters.token)
		},
		async setUrl() {
			const { query } = this
			let token = await this.getToken()
			console.log(token, 'token')
			let url = query.url ? decodeURIComponent(query.url) : this.defaultUrl
			const src = url
			let timeString = '&t=' + new Date().getTime()

			this.src =
				(src + (src.indexOf('?') > -1 ? '&' : '?') + timeString).replace('?&', '?') +
				'&token=' +
				token
		},
		// 接收h5信息
		h5Message({ detail }) {
			const { data } = detail
			console.log(detail, 'h5Message')
			let arr = data

			let item = arr.filter(v => v.type === 'share')

			if (item && item.length) {
				this.shareOpts = item[item.length - 1].data
			}
		}
	}
}
