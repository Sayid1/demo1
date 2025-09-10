import md5 from 'js-md5'

// const clientKey = ''
// const clientSecret = ''

import { envSignature } from '@/config/api'

const { clientKey, clientSecret } = envSignature

/**
 * 获取url参数转换成json对象
 * @param {Object} url
 */
export function getQueryObject(url) {
    if (url == null) {
        return null
    }
    var search = url.substring(url.lastIndexOf('?') + 1)
    var obj = {}
    var reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, function(rs, $1, $2) {
        var name = $1
        var val = $2
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 将json对象key按照 ABCD字母的顺序排序
 * @param {Object} obj
 */
export function sortObjByKey(obj) {
    var keys = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < keys.length; i++) {
        var index = keys[i]
        newObj[index] = obj[index]
    }
    return newObj
}

/**
 * 生成随机字符串
 * @param {Object} len
 */
export function randomString(len) {
    len = len || 32
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}

/**
 * 获取中国时区得时间戳
 */
export function getTimestamp() {
    const timeZone = 8
    // const spliter = '-'
    // 获取本地时间与格林威治时间的时间差(注意是分钟，记得转换)
    const diff = new Date().getTimezoneOffset()
    // 根据本地时间和时间差获得格林威治时间
    const absTime = new Date().getTime() + diff * 60 * 1000
    // 根据格林威治时间和各地时区，得到各地时区的时间
    const localTime = new Date(absTime + timeZone * 60 * 60 * 1000)
    // 考虑夏令时
    // const format = formatTime(localTime, spliter)
    // console.log('date=', format)
    var utcTime = new Date(
        Date.UTC(
            localTime.getFullYear(),
            localTime.getMonth(),
            localTime.getDate(),
            localTime.getHours() - 8,
            localTime.getMinutes(),
            localTime.getSeconds(),
            localTime.getUTCMilliseconds()
        )
    )
    const time = utcTime.getTime()
    // console.log('time=', time)
    return time
}

/**
 * 组装签名的url
 * @param {Object} url
 */
export function assemblySignatureUrl(url, timestampFn) {
    if (url.indexOf('?') === -1) {
        url += '?'
    } else if (url.indexOf('&') === -1) {
        url += '&'
    }
    // 生成签名对象
    const signObj = {
        clientKey: clientKey,
        clientSecret: clientSecret,
        timestamp: timestampFn ? timestampFn() : getTimestamp(),
        nonce: randomString(16)
    }
    // 签名Key排序
    const sortObj = sortObjByKey(signObj)
    let signStr = ''
    // 组装签名字符串
    for (const key in sortObj) {
        const value = sortObj[key]
        signStr += key + '=' + value + '&'
    }
    // 加密字符串
    const encodeStr = signStr.substring(0, signStr.length - 1) // encodeURIComponent(signStr.substring(0, signStr.length - 1))
    const md5SignStr = md5(encodeStr).toLocaleUpperCase()
    let index = url.indexOf('?')
    // 组装签名的url
    const signUrl =
        url +
        (index !== -1 ? (index === url.length - 1 ? '' : url.endsWith('&') ? '' : '&') : '?') +
        'timestamp=' +
        signObj.timestamp +
        '&nonce=' +
        signObj.nonce +
        '&signature=' +
        md5SignStr

    return signUrl.replace(/&&/g, '&')
}
