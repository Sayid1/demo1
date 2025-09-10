<template>
	<u-tabbar
		:value="current"
		:fixed="true"
		:placeholder="placeholder"
		:border="false"
		:safeAreaInsetBottom="true"
		:activeColor="activeColor"
		:inactiveColor="inactiveColor"
	>
		<view class="border"></view>
		<u-tabbar-item
			v-for="(item, index) in tabbarList"
			:key="index"
			:text="item.text"
			:name="index"
			@click="click"
			:badge="item.badge"
			:dot="!!item.dot"
			:badgeStyle="item.badgeStyle || ''"
		>
			<view class="" slot="active-icon" style="margin-top:8rpx">
				<ui-image
					:src="item[iconKey] || item.iconPath"
					width="48rpx"
					height="48rpx"
					mode="heightFix"
				></ui-image>
			</view>
			<view class="" slot="inactive-icon" style="margin-top:8rpx">
				<ui-image
					:src="item[selectedIconKey] || item.selectedIconPath"
					width="48rpx"
					height="48rpx"
					mode="heightFix"
				></ui-image>
			</view>
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
import componentMixins from '@/mixins/components'
import { findRouterInfo } from '@/libs/utils/router.js'
export default {
	mixins: [componentMixins],
	props: {
		lists: {
			type: Array,
			default: uni.$ui.props.tabbar.lists
		},
		placeholder: {
			type: Boolean,
			default: uni.$ui.props.tabbar.placeholder
		},
		iconKey: {
			type: String,
			default: uni.$ui.props.tabbar.iconKey
		},
		selectedIconKey: {
			type: String,
			default: uni.$ui.props.tabbar.selectedIconKey
		},
		inactiveColor: {
			type: String,
			default: uni.$ui.props.tabbar.inactiveColor
		},
		activeColor: {
			type: String,
			default: uni.$ui.props.tabbar.activeColor
		},
		border: {
			type: Boolean,
			default: uni.$ui.props.tabbar.border
		}
	},
	data() {
		return {}
	},
	computed: {
		tabbarList() {
			let { lists } = this

			if (lists && lists.length) {
				return lists
			}
			return this.$store.state.tabbar.lists || []
		},
		current() {
			const pages = getCurrentPages()
			const page = pages[pages.length - 1]
			const route = '/' + page.route

			let index = this.tabbarList.findIndex(v => {
				let { path = '' } = v
				let item = findRouterInfo(path)
				let r = item?.path || path.split('?')[0]
				let flag = r === route && !(v.appId || v.app_id)

				return flag
			})

			return index
		}
	},
	methods: {
		click(index) {
			if (this.current === index) {
				return
			}
			const curItem = this.tabbarList[index]
			const { path, appId, auth } = curItem

			let authArr = []
			// 需要授权
			if (auth) {
				if (Array.isArray(auth)) {
					authArr = auth
				} else {
					authArr = [auth]
				}

				this.$ui.$openAuth({
					flow: authArr.length > 1 ? 1 : 0,
					openType: authArr[0],
					success: () => {
						navTo.call(this)
					}
				})
			} else {
				navTo.call(this)
			}

			function navTo() {
				if (curItem) {
					this.$navToMix({
						path,
						appId
					})
				}
			}
		}
	},
	watch: {},

	// 组件周期函数--监听组件挂载完毕
	mounted() {}
}
</script>

<style lang="scss" scoped>
.border {
	height: 1rpx;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	background: #eee;
	pointer-events: none;
}
</style>
