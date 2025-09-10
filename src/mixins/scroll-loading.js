let COUNT = 0
let getScrollVm = function(vm) {
	if (vm._data.scollVmMarker || !vm.$parent || COUNT > 20) {
		COUNT = 0
		return vm
	} else {
		COUNT++
		return getScrollVm(vm.$parent)
	}
}

export default {
	data() {
		let pageMin = uni.$ui.props.mixins?.scrollLoading?.pageMin

		let _requestTaskId = uni.$u.guid(5)
		return {
			scrollList: [],
			// 当前返回数据
			scrollOpts: {
				scrollToTop: true,
				pageKey: uni.$ui.props.mixins?.scrollLoading?.pageKey || 'page',
				pageSizeKey: uni.$ui.props.mixins?.scrollLoading?.pageSizeKey || 'limit',
				pageMin: typeof pageMin === 'undefined' ? 1 : pageMin,
				pageSize: uni.$ui.props.mixins?.scrollLoading?.pageSize || 10,
				listKey: uni.$ui.props.mixins?.scrollLoading?.listKey || 'records',
				totalKey: uni.$ui.props.mixins?.scrollLoading?.totalKey || 'total',
				pagesKey: uni.$ui.props.mixins?.scrollLoading?.pagesKey || 'pages',
				// 判断是否继续下拉的模式  total => 总数判断  pageSize =>  pageSize === 返回数量(可能会多拉一次) once => 只加载一页
				scrolPullUpMode: 'total',
				scrollListKey: 'scrollList'
			},
			scrollQuery: {},
			firstScrollLoading: true,
			scollVmMarker: true,
			isScrollUpFinish: false,
			// 是否先清空
			isEmptyListBeforeRefresh: true,

			// 防止tab快速切换请求并发导致数据异常
			_requestTaskId
		}
	},
	computed: {
		scrollListKey() {
			return this.scrollOpts.scrollListKey || 'scrollList'
		},
		isScrollListEmpty() {
			return !this.firstScrollLoading && !this.isScrollListLen
		},
		isScrollListLen() {
			return this[this.scrollListKey].length
		},
		isPageSizeMode() {
			return this.scrollOpts.scrolPullUpMode === 'pageSize'
		}
	},
	methods: {
		updateRequestTaskId() {
			this._requestTaskId = uni.$u.guid(5)
		},

		scrollPullUp() {
			let scrollVm = getScrollVm(this)
			scrollVm.loadScrollData()
		},
		scrollPullDown() {
			let scrollVm = getScrollVm(this)

			scrollVm.firstScrollLoading = true
			scrollVm.initScrollQuery()
			if (this.isEmptyListBeforeRefresh) {
				scrollVm[this.scrollListKey] = []
			}

			scrollVm.loadScrollData()
		},
		initScrollQuery() {
			let { pageMin, pageKey, pageSizeKey, pageSize } = this.scrollOpts

			this.scrollQuery = {
				[pageKey]: pageMin,
				[pageSizeKey]: pageSize
			}
			if (this.isEmptyListBeforeRefresh) {
				this[this.scrollListKey] = []
			}
		},
		refreshScroll(showRefresh = true) {
			let pullScroll = this.$refs.pullScroll
			if (!pullScroll) return
			this.firstScrollLoading = true
			this.isScrollUpFinish = false
			this.initScrollQuery()
			// 更新任务id
			this.updateRequestTaskId()
			pullScroll.refresh(showRefresh)
			if (this.scrollOpts.scrollToTop) {
				pullScroll.onBackTop()
			} else {
				pullScroll.isShowBackTop = false
			}
		},
		loadScrollData() {
			let pullScroll = this.$refs.pullScroll
			let { pageKey, pageSizeKey, totalKey, listKey, pageMin } = this.scrollOpts
			let _oldRequestTaskId = this._requestTaskId

			if (
				typeof (
					this.scrollQuery[pageKey] ||
					(this.scrollExtQuery && this.scrollExtQuery[pageKey])
				) === 'undefined'
			) {
				this.initScrollQuery()
			}

			let { scrollExtQuery, scrollQuery } = this

			let { [pageKey]: page, [pageSizeKey]: size } = scrollQuery

			if (typeof this.scrollApi !== 'function') return

			pullScroll.isEmpty = false
			this.scrollApi({
				...scrollQuery,
				...scrollExtQuery
			})
				.then(res => {
					// 请求任务id不一致 不做处理
					if (this._requestTaskId !== _oldRequestTaskId) {
						return
					}
					this.firstScrollLoading = false
					let data = res.data || {}
					let content = data[listKey] || []
					let isOnePage = this.scrollOpts.scrolPullUpMode === 'once'
					// 数据返回数组
					if (Array.isArray(data)) {
						content = data
						isOnePage = true
					} else if (typeof data[totalKey] === 'undefined') {
						// 如果不带总数
						this.scrollOpts.scrolPullUpMode = 'pageSize'
					}

					if (typeof this.scrollListMiddleware === 'function') {
						content = this.scrollListMiddleware(content)
					}

					// 第一页先清空
					if (pageMin === page) {
						this[this.scrollListKey] = []
					}
					this[this.scrollListKey] = this[this.scrollListKey].concat(content)

					if (typeof this.scrollListSuccess === 'function') {
						content = this.scrollListSuccess(this[this.scrollListKey])
					}
					let arr = [...this[this.scrollListKey]]
					this.$emit('scrollLoadSuccess', arr)

					if (typeof this.onScrollLoadSuccess === 'function') {
						this.onScrollLoadSuccess(arr)
					}
					let finishFlag = false
					if (isOnePage) {
						finishFlag = true
					} else if (this.isPageSizeMode) {
						let pages = data[this.scrollOpts.pagesKey]

						// 当前页和总页数相等 完结
						finishFlag = pageMin === 0 ? page + 1 >= pages : page >= pages
					} else {
						finishFlag = data[totalKey] <= (page + (pageMin === 0 ? 1 : 0)) * size
					}

					//pullScroll.success()
					if (finishFlag) {
						if (!this.isScrollListEmpty) {
							pullScroll.finish()

							this.isScrollUpFinish = true
							if (typeof this.onPullScrollFinish === 'function') {
								this.onPullScrollFinish()
							}
						} else {
							pullScroll.empty()
							if (typeof this.onPullScrollEmpty === 'function') {
								this.onPullScrollEmpty()
							}
						}
					} else {
						if (!this.isScrollListEmpty) {
							pullScroll.success()
							if (typeof this.onPullScrollSuccess === 'function') {
								this.onPullScrollSuccess()
							}
						} else {
							pullScroll.empty()
							if (typeof this.onPullScrollEmpty === 'function') {
								this.onPullScrollEmpty()
							}
						}
					}
					if (typeof this.onPullScrollComplete === 'function') {
						this.onPullScrollComplete({
							...scrollQuery,
							...scrollExtQuery
						})
					}
					// 当页面加载不是加载完的状态的时候页数+1
					if (!finishFlag) {
						this.scrollQuery[pageKey] += 1
					}
				})
				.catch(err => {
					console.log(err, 'pullScroll.error')
					this.firstScrollLoading = false
					pullScroll && pullScroll.error()
				})
		}
	}
}
