export default {
	options: {
		virtualHost: true
	},
	props: {
		// 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
		customStyle: {
			type: [Object, String],
			default: () => ({})
		},
		customClass: {
			type: String,
			default: ''
		}
	},
	methods: {
		addUnit(value, unit) {
			return this.$ui.addUnit(value, unit)
		}
	}
}
