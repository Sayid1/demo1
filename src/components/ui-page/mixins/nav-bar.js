import { getNavigationBarTitle } from '@/libs/utils/sys'
import { findHomeRouter } from '@/libs/utils/router'
import { getCurRouter } from '@/libs/utils/router'
import { checkInTabbar } from '@/libs/utils/sys'

export default {
	props: {
		headerBackground: {
			type: Object,
			default: uni.$ui.props.page.headerBackground
		},
		// 头部左边图标一直显示
		showHeaderLeftIconAlway: {
			type: Boolean,
			default: uni.$ui.props.page.showHeaderLeftIconAlway
		},
		// 是否显示头部左边图标
		showHeaderLeftIcon: {
			type: [Boolean, Object],
			default: uni.$ui.props.page.showHeaderLeftIcon
		},
		// 是否显示头部导航
		showHeader: {
			type: Boolean,
			default: uni.$ui.props.page.showHeader
		},
		// 隐藏头部返回首页按钮
		hideHomeIcon: {
			type: Boolean,
			default: uni.$ui.props.page.hideHomeIcon
		},
		// 在tabbar 自动隐藏home 按钮
		hideHomeIconInTabbar: {
			type: Boolean,
			default: uni.$ui.props.page.hideHomeIconInTabbar
		},
		// 是否显示头部标题
		showTitle: {
			type: Boolean,
			default: uni.$ui.props.page.showTitle
		},
		// 左边图标
		headerLeftIcon: {
			type: String,
			default: uni.$ui.props.page.headerLeftIcon
		},
		// 头部标题颜色
		titleColor: {
			type: String,
			default: uni.$ui.props.page.titleColor
		},
		// 头部标题
		title: {
			type: String,
			default: uni.$ui.props.page.title
		},
		// 点击左侧区域(返回图标)，是否自动返回上一页
		autoBack: {
			type: Boolean,
			default: uni.$ui.props.page.autoBack
		}
	},
	watch: {
		// 同步标题
		headerTitle: {
			handler(val) {
				if (val && val.trim()) {
					uni.setNavigationBarTitle({
						title: val
					})
				}
			},
			immediate: true
		}
	},
	computed: {
		// 导航头左边图标
		leftIcon() {
			return this.headerLeftIcon || this.showHomeIcon ? 'home' : 'arrow-left'
		},
		// 标题
		headerTitle() {
			return this.title || getNavigationBarTitle()
		},
		showLeftIcon() {
			return this.isMutilPage && this.showHeaderLeftIcon !== false
		},
		// 页面是是否大于1
		isMutilPage() {
			let pages = getCurrentPages()
			return pages.length > 1
		},
		// 是否显示home按钮
		showHomeIcon() {
			return (
				!this.hideHomeIcon &&
				!this.showLeftIcon &&
				!(this.hideHomeIconInTabbar && checkInTabbar(getCurRouter().path))
			)
		}
	},
	methods: {
		leftIconClick(evt) {
			if (this.showHomeIcon) {
				let item = findHomeRouter() || { path: 'pages/index/index' }
				if (getCurRouter().path !== item.path) {
					this.$navTo(item.path)
				}
			} else if (this.autoBack) {
				uni.navigateBack({
					delta: 1
				})
			}
			this.$emit('leftIconClick', evt)
		}
	}
}
