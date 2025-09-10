<template>
	<view
		class="bgm-box"
		:class="[
			customClass,
			{
				animation: isPlaying && isAnimation
			}
		]"
		:style="[
			{ width: addUnit(width), height: addUnit(height), 'animation-duration': speed },
			$u.addStyle(customStyle)
		]"
		@click="toggle"
	>
		<slot>
			<ui-svg-icon
				:name="isPlaying ? activeIcon : icon"
				:width="addUnit(width)"
				:height="addUnit(width)"
				:isFill="false"
			/>
		</slot>
	</view>
</template>
<script>
import componentMixins from '@/mixins/components'
export default {
	mixins: [componentMixins],
	props: {
		storeKey: {
			type: String,
			default: 'bgm'
		},
		src: {
			type: String,
			default: ''
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		loop: {
			type: Boolean,
			default: true
		},
		width: {
			type: [String, Number],
			default: 72
		},
		height: {
			type: [String, Number],
			default: 72
		},
		icon: {
			type: String,
			default: ''
		},
		activeIcon: {
			type: String,
			default: ''
		},
		speed: {
			type: String,
			default: '1.5s'
		},
		isAnimation: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {}
	},
	watch: {
		src: {
			handler(val) {
				if (val) {
					this.initAudio()
				}
			},
			immediate: true
		}
	},
	mounted() {},
	computed: {
		audioVm() {
			return this.audio.vm
		},
		audio() {
			return this.$store.state.audio[this.storeKey] || {}
		},
		isPlaying() {
			let { status } = this.audio
			return this.$store.getters['audio/isPlaying'](status)
		}
	},
	methods: {
		toggle() {
			if (this.isPlaying) {
				this.pause()
			} else {
				this.play()
			}
		},
		initAudio() {
			let { src, autoplay, loop, storeKey } = this
			this.$store.dispatch('audio/init', {
				src,
				autoplay,
				loop,
				key: storeKey
			})
		},
		play() {
			this.$store.dispatch('audio/play', this.storeKey)
		},
		pause() {
			this.$store.dispatch('audio/pause', this.storeKey)
		},
		stop() {
			this.$store.dispatch('audio/stop', this.storeKey)
		}
	}
}
</script>

<style lang="scss" scoped>
.bgm-box {
	position: fixed;
	right: 24rpx;
	top: 200rpx;
	z-index: 100;

	&.animation {
		animation-name: rotate;
		transform-origin: center center;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
