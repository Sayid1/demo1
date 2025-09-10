export default {
	props: {
		indicator: {
			type: Object,
			default() {
				return {}
			}
		},
		// 指示器的模式，rect|dot|number|round
		indicatorMode: {
			type: String,
			default: 'round'
		},
		// 指示器的位置，topLeft|topCenter|topRight|bottomLeft|bottomCenter|bottomRight
		indicatorPos: {
			type: String,
			default: 'bottomCenter'
		},
		indicatorWidth: {
			type: [String, Number],
			default: 26
		},
		indicatorHeight: {
			type: [String, Number],
			default: 8
		},
		// 是否开启缩放效果
		effect3d: {
			type: Boolean,
			default: false
		},
		indicatorDots: {
			type: Boolean,
			default: true
		},
		indicatorY: {
			type: [Number, String],
			default: 12
		},
		indicatorActiveColor: {
			type: String,
			default: 'rgba(255, 255, 255, 0.8)'
		},
		indicatorColor: {
			type: String,
			default: 'rgba(255, 255, 255, 0.3)'
		},
		indicatorStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		indicatorItemStyle: {
			type: Object,
			default() {
				return {}
			}
		}
	}
}
