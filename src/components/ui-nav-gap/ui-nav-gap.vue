<template>
	<view v-if="isSafeBottom" :style="{ height: safeBottomH }" style="width: 100%"></view>
	<view v-else :style="{ height: height + 'px' }"></view>
</template>

<script>
import { getTabbarHeight, getNavbarHeight } from '@/libs/utils/sys.js'
import componentMixins from '@/mixins/components'
/**
 * tabbar navbar safe-bottom 占位
 * @description 占位
 * @property {String} type
 *  @value navbar
 *  @value tabbar
 *  @value safe-bottom
 */
export default {
	name: 'ui-nav-gap',
	mixins: [componentMixins],
	props: {
		// 非底部安全区域高度 间隙
		gap: {
			type: [Number, String],
			default: 0
		},
		type: {
			type: String,
			default: uni.$ui.props.navGap.type
		}
	},
	computed: {
		isSafeBottom() {
			return this.type === 'safe-bottom'
		},
		height() {
			return this.type === 'navbar' ? getNavbarHeight() : getTabbarHeight()
		},
		safeBottomH() {
			let sys = uni.getSystemInfoSync()
			let val = sys.screenHeight - sys.safeArea.bottom
			return val ? val + 'px' : this.addUnit(this.gap)
		}
	}
}
</script>

<style lang="scss" scoped></style>
