import { getCurRouter } from '@/libs/utils/router'

export default {
	data() {
		return {
			$appRouter: {}
		}
	},
	onLoad() {
		this.$appRouter = getCurRouter()
	},
	mounted() {
		this.$appRouter = getCurRouter()
	},
	onShow() {
		this.$appRouter = getCurRouter()
	}
}
