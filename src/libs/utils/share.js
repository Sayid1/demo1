export const setShareMessage = function(opts, opt) {
	if (typeof opts === 'function') {
		return opts(opt)
	}
	return opts
}
export const showShareMenu = function(opts) {
	// #ifdef MP
	uni.showShareMenu(opts)
	// #endif
}
