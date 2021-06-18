/*
 * @Author: 耿为刚 创建
 * @Date: 2020-03-19 14:41:10
 * @Last Modified by: gengweigang
 * @Last Modified time: 2020-04-08 16:28:59
 * @Desc 全局过滤器
 */
// 时间截取年月日
export const formatData = str => {
  if (!str) {
    return ''
  }
  return str.substring(0, 10)
}
export const initTime = seconds => {
  let h = Math.floor(seconds / 3600)
  let min = Math.floor((seconds % 3600) / 60)
  let s = Math.floor((seconds % 3600) % 60)
  return `${h < 10 ? '0' + h : h}:${min < 10 ? '0' + min : min}:${s < 10 ? '0' + s : s}`
}
export const dateYMD = date => {
  if (!date) return
  return moment(date).format('YYYY-MM-DD')
}

export const ymd = date => {
  return date ? moment(date).format('YYYY-MM-DD') : ''
}
export const date = date => {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
}
// 万元过滤
export const wan = (value, mantissa) => {
  if (mantissa || mantissa === 0) {
    return _.isNumber(value) ? _.round(value / 10000, mantissa) : 0
  } else {
    let result = _.isNumber(value) ? _.round(value / 10000, 0) : 0
    if (result === 0) {
      result = _.isNumber(value) ? _.round(value / 10000, 2) : 0
    }
    return result
  }
}
export default {
  initTime,
  dateYMD,
  wan
}
