import { findRouterInfo } from '@/libs/utils/router.js'
export default {
	props: {
		tabbarList: {
			type: Array,
			default: uni.$ui.props.tabbar.lists
		},
		tabbarIconKey: {
			type: String,
			default: uni.$ui.props.tabbar.iconKey
		},
		tabbarSelectedIconKey: {
			type: String,
			default: uni.$ui.props.tabbar.selectedIconKey
		},
		tabbarInactiveColor: {
			type: String,
			default: uni.$ui.props.tabbar.inactiveColor
		},
		tabbarActiveColor: {
			type: String,
			default: uni.$ui.props.tabbar.activeColor
		},
		tabbarBorder: {
			type: Boolean,
			default: uni.$ui.props.tabbar.border
		}
	},
	computed: {
		tabbarItems() {
			let { tabbarList: lists } = this

			if (lists && lists.length) {
				return lists
			}
			return this.$store.state.tabbar.lists || []
		},
		tabbarCurrent() {
			const pages = getCurrentPages()
			const page = pages[pages.length - 1]
			const route = '/' + page.route

			let index = this.tabbarItems.findIndex(v => {
				let { path = '' } = v
				let r = ''
				let info = findRouterInfo(path)
				if (info) {
					r = info.path
				} else {
					r = path.split('?')[0]
				}

				let flag = r === route && !v.appId

				return flag
			})
			return index
		}
	}
}
