import { getParentPageSync } from '@/libs/utils/page'

export default {
	onShow() {
		//this.$store.dispatch('page/setPageOnShow', true)
	},
	onHide() {
		//this.$store.dispatch('page/setPageOnShow', false)
	},
	computed: {
		PAGE_ON_SHOW() {
			return 1 //this.$store.state.page.pageOnShow
		}
	},
	methods: {
		checkPageOnShow(route) {
			let vm = getParentPageSync(this)
			return !!this.PAGE_ON_SHOW[route || vm?._uid]
		}
	}
}
