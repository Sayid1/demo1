export default {
	width: '646',
	zIndex: 10075,
	borderRadius: 0,
	contentStyle() {
		return {}
	},
	maskCloseAble: false,
	closeName: 'close-fill',
	closeWidth: '64rpx',
	closeHeight: '64rpx',
	closeFill: () => ['#333333', '#fff'],
	showClose: true,
	mode: 'center',
	bgColor: 'transparent',
	safeAreaInsetBottom: true,
	html: '',
	isScroll: true,
	scrollHeight: '',
	title: '',
	content: '',
	buttons() {
		return []
	},
	// 是否使用富文本点击操作
	useRichTextAction: true,
	closeIconPos: 'bottom'
}
