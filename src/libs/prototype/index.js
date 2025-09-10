import { navTo, navToMix, navBack } from '@/libs/utils/router'

const protoObj = {
	navTo,
	navToMix,
	navBack
}

const install = Vue => {
	for (let p in protoObj) {
		Vue.prototype['$' + p] = protoObj[p]
	}

	Vue.prototype.$ui = uni.$ui
}

export default {
	install
}
