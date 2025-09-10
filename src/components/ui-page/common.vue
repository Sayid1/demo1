<template>
	<view class="common-components" v-if="commonVmList.length">
		<ui-toast v-if="checkInCommonVmList('toast')" ref="toast" />
		<ui-toast-loading v-if="checkInCommonVmList('toastLoading')" ref="toastLoading" />
		<ui-dialog v-if="checkInCommonVmList('dialog')" ref="dialog" />
		<ui-auth-popup v-if="checkInCommonVmList('authPopup')" ref="authPopup" />
	</view>
</template>

<script>
import componentMixins from '@/mixins/components'
export default {
	name: 'ui-common-components',
	mixins: [componentMixins],
	data() {
		return {
			commonVmList: []
		}
	},
	methods: {
		checkInCommonVmList(ref) {
			return this.commonVmList.includes(ref)
		},
		setCommonVmList(ref) {
			if (!this.checkInCommonVmList(ref)) {
				this.commonVmList.push(ref)
			}
		},
		getRef(ref) {
			this.setCommonVmList(ref)

			return new Promise(reslove => {
				this.$nextTick(() => {
					reslove(this.$refs[ref])
				})
			})
		}
	}
}
</script>
