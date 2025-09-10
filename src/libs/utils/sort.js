// 乱序
export const shuffle = function(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i)
		;[a[i - 1], a[j]] = [a[j], a[i - 1]]
	}
	return a
}

// 数组排序 乱序
export const transformArrayOrder = function(dataArr, key = 'sort') {
	if (!dataArr) return []
	let arr = []
	let topArr = []
	dataArr.forEach(v => {
		if (v.isTop) {
			topArr.push(v)
		} else {
			arr.push(v)
		}
	})
	const len = arr.length
	// 待排序
	let arr2 = []
	// 固定排序
	const arr3 = []
	// 排序大于长度
	let arr4 = []
	// 全部
	let arr5 = new Array(len).fill('')

	arr.forEach(v => {
		if (!v[key] || v[key] < 1) {
			arr2.push(v)
		} else if (v[key] > len) {
			arr4.push(v)
		} else {
			arr3.push(v)
		}
	})

	if (arr2.length > 1) {
		arr2 = shuffle(arr2)
	}

	// 固定位置赋值
	arr3.forEach(v => {
		arr5[v[key] - 1] = v
	})

	let len2 = arr2.length

	arr5.forEach((v, i) => {
		if (len2 === 0 || v) {
			return false
		}

		arr5[i] = arr2[len2 - 1]
		--len2
	})
	arr4 = arr4.sort((a, b) => {
		return a[key] - b[key]
	})
	topArr = topArr.sort((a, b) => {
		return new Date(b.topTime).getTime() - new Date(a.topTime).getTime()
	})

	arr5 = [...topArr, ...arr5, ...arr4]

	return arr5.filter(v => v)
}

// 日期正排序
export const sortDownDate = function(a, b) {
	return Date.parse(a.createDate) - Date.parse(b.createDate)
}

// 日期倒排序
export const sortUpDate = function(a, b) {
	return Date.parse(b.createDate) - Date.parse(a.createDate)
}
