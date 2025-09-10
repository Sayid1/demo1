export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: false,
			modalOpts: {},
			defaultModalOpts: {},
			timestamp: 0,
			isFirstShow: true
		}
	},
	watch: {
		show: {
			handler(val) {
				let isTimestamp = this.modalOpts.isTimestamp
				this.$emit('input', val)
				if (val) {
					this.emitEvent('open', this.isFirstShow)
					if (isTimestamp) {
						this.timestamp = new Date().getTime()
					}
					if (typeof this.afterOpen === 'function') {
						this.afterOpen()
					}
				} else {
					this.emitEvent('close', this.isFirstShow)
					if (typeof this.afterClose === 'function') {
						if (isTimestamp) {
							this.timestamp = new Date().getTime() - this.timestamp
						}

						if (!this.isFirstShow) {
							this.afterClose({ timestamp: this.timestamp })
						}
					}
				}
				this.isFirstShow = false
			},
			immediate: true
		},
		value: {
			handler(val) {
				this.show = val
			},
			immediate: true
		}
	},
	methods: {
		open(opts) {
			this.$set(this, 'modalOpts', {
				isTimestamp: true,
				...this.defaultModalOpts,
				...opts
			})
			this.show = true
			return this
		},
		close() {
			this.show = false
		},
		emitEvent(key, ...arg) {
			this.$emit.apply(this, [key, ...arg])
			if (typeof this.modalOpts[key] === 'function') {
				this.modalOpts[key].apply(this, arg)
			}
		},
		getModalProps(key) {
			return typeof this.modalOpts[key] !== 'undefined' ? this.modalOpts[key] : this[key]
		}
	}
}
