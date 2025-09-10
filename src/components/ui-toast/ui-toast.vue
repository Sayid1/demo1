<template>
	<u-overlay
		z-index="20100"
		:show="show"
		@click="maskClick"
		:custom-style="{
			background: 'transparent',
			display: 'flex',
			'align-items': 'center',
			'justify-content': 'center',
			'pointer-events': 'none'
		}"
	>
		<view class="ui-toast-container u-flex u-col-center u-row-center toast-container">
			<view class="">
				<view class="loading-text" v-if="text">
					{{ text }}
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
import modalMixins from '@/mixins/modal.js'
import componentMixins from '@/mixins/components'
export default {
	name: 'ui-toast',
	mixins: [modalMixins, componentMixins],
	data() {
		return {
			text: '',
			duration: 2000,
			mask: true
		}
	},
	methods: {
		showToast(opt = {}) {
			this.text = opt.title || ''
			this.duration = opt.duration || 2000
			this.mask = !opt.mask
			this.open()

			setTimeout(() => {
				this.hideToast()

				if (typeof opt.onClose === 'function') {
					opt.onClose()
				}
			}, this.duration)
		},
		hideToast() {
			this.close()
		},
		maskClick() {
			if (!this.mask) {
				this.show = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.toast-container {
	max-width: 500rpx;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 10rpx;
	color: #fff;
	text-align: center;
	padding: 25rpx 30rpx;
}
.loading-text {
	font-size: 28rpx;
}
</style>
