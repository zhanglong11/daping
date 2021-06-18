/*
 * @Description: 获取详情信息上的附件信息
 * @Author:
 * @Date: 2020-10-14 09:19:00
 */

exports.install = function (Vue, options) {
  Vue.prototype.getAccessoryInfo = function () {
    let liItem = document.getElementById('accessory').children[0].children[0].children
    let strInfo = ''
    for (let i = 0; i < liItem.length; i++) {
      if (liItem[i].children.length === 0) {
        // 无附件
        strInfo = ',' + liItem[i].innerText
        break
      } else {
        // 有附件
        strInfo += ',' + liItem[i].children[0].innerText
      }
    }
    strInfo = strInfo.substr(1)
    return strInfo
  }
}
