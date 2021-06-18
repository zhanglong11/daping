/*
 * @Description:
 * @Author:
 * @Date: 2020-01-15 09:09:52
 */

import { JSEncrypt } from 'jsencrypt'
/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 获取其他平台地址
export const getOrigin = (num = 1, design) => {
  const origin = location.origin
  const lastOrigin = parseInt(origin[origin.length - 1]) + num
  const newOrigin = origin.substring(0, origin.length - 1) + lastOrigin
  let url = `${newOrigin}/#`
  if (design) {
    // 设计协同跳转专用
    url = `http://${location.hostname}:${design}/#`
  }
  return url
}

// 登录加密
export const userEncryption = obj => {
  let PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChqImB8Pz4nTh3UBbA5m9zb+YCIwvop1Zxr8Bii6xoEt6+znWy/2WVXMV/NH28Yq34cH68VdcKSikEQlGnAqhci+9rrjVo0/vS2/D6RJcihXqfST9ZOMFsRJgxAQWyIbjL/Gf7HD5NrCM54TE+YOk/P6eI5Nc8lbkxXEavrLDtOwIDAQAB'

  // 使用公钥加密
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  let loginName = encrypt.encrypt(obj.loginName)
  let password = encrypt.encrypt(obj.password)
  return {
    ...obj,
    loginName,
    password
  }
}

const getDateAll = (date, type) => {
  let year = date.getFullYear()
  //day获取当前几号，不足10补0
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  //month获取当前月份的日期，不足10补0
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let newDate = year + '-' + month + '-' + day
  if (type === 'datetime') {
    newDate += ' ' + hours + ':' + minutes + ':' + seconds
  }
  return newDate
}
/*
		获取日期函数 返回2018-06-06
		AddDayCount 天数
		getDateStr(0) //获取当前日期
		getDateStr(-10) //获取前10天日期
		getDateStr(20) //获取后20天日期
       */
export const getDateStr = (AddDayCount, type = 'datetime') => {
  let date = new Date()
  date.setDate(date.getDate() + AddDayCount)
  return getDateAll(date)
}
//获取周一和周日 日期，返回两种格式时间
export const getDateWeek = data => {
  let now = data ? new Date(data) : new Date()
  let nowTime = now.getTime()
  let day = now.getDay()
  let oneDayLong = 1000 * 60 * 60 * 24
  let MondayTime = nowTime - (day - 1) * oneDayLong
  let SundayTime = nowTime + (7 - day) * oneDayLong
  let monday = new Date(MondayTime)
  let sunday = new Date(SundayTime)
  let list = [
    getDateAll(monday), // 周一
    getDateAll(new Date(nowTime + (2 - day) * oneDayLong)), // 周二
    getDateAll(new Date(nowTime + (3 - day) * oneDayLong)), // 周三
    getDateAll(new Date(nowTime + (4 - day) * oneDayLong)), // 周四
    getDateAll(new Date(nowTime + (5 - day) * oneDayLong)), // 周五
    getDateAll(new Date(nowTime + (6 - day) * oneDayLong)), // 周六
    getDateAll(sunday) // 周日
  ]
  return {
    first: getDateAll(monday),
    last: getDateAll(sunday),
    list,
    firstDate: monday,
    lastDate: sunday
  }
}
