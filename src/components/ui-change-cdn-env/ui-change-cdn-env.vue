<template>
	<div class="" v-if="envVersion !== 'release'">
		<view class="env-icon" @click="show = true">
			<u-icon
				label="切换环境"
				labelPos="bottom"
				labelSize="20rpx"
				size="60rpx"
				name="setting"
			></u-icon>
		</view>
		<u-action-sheet
			:actions="list"
			round="24rpx"
			@close="show = false"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			title="环境切换"
			:show="show"
			@select="actionClick"
		></u-action-sheet>
	</div>
</template>

<script>
import { envVersion } from '@/config/index'
export default {
	name: 'ui-change-cdn-env',
	props: {},
	data() {
		return {
			show: false,
			envVersion
		}
	},
	computed: {
		list() {
			let configEvn = uni.getStorageSync('configEnvVersion')
			let arr = [
				{
					name: '使用测试配置' + (configEvn !== 'release' ? '(当前配置)' : ''),
					color: '#999',
					fontSize: '32rpx',
					fnName: 'changeConfigEvnTest'
				},
				{
					name: '使用线上配置' + (configEvn === 'release' ? '(当前配置)' : ''),
					color: '#999',
					fontSize: '32rpx',
					fnName: 'changeConfigEvnProduct'
				},
				{
					name: '清除本地缓存',
					color: '#999',
					fontSize: '32rpx',
					fnName: 'clearConfigStorage'
				}
			]
			return arr
		}
	},
	methods: {
		actionClick(item) {
			if (typeof this[item.fnName] === 'function') {
				this[item.fnName]()
			}
		},
		changeEnv(env) {
			uni.setStorageSync('configEnvVersion', env)
		},
		clearConfigStorage() {
			uni.clearStorage()
			this.showTips('清除成功，')
		},
		changeConfigEvnTest() {
			this.changeEnv('develop')
			this.showTips('切换成功，')
		},
		changeConfigEvnProduct() {
			this.changeEnv('release')
			this.showTips('切换成功，')
		},
		showTips(fix = '') {
			uni.showToast({
				title: fix + '请点击右上角重新进入小程序',
				duration: 5000
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.env-icon {
	position: fixed;
	right: 24rpx;
	bottom: 220rpx;
	z-index: 1000;
}
</style>
