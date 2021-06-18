/*
 * @Author: 耿为刚 创建
 * @Date: 2020-04-28
 */
import router from '@/router'
import Vue from 'vue'
const state = {
  approvalType: localStorage.getItem('approvalType') || '', // 审批类型
  approvalTargetId: localStorage.getItem('approvalTargetId') || '', // 审批主键Id
  approvalRouter: localStorage.getItem('approvalRouter') || '' // 审批路由
}

const mutations = {
  // 设置审批缓存
  setApprovalType(state, obj) {
    let routerList = obj.routerName.split(',')
    obj.projectDataList.map(e => {
      if (obj.item.projectId === e.id) {
        e.routerName = routerList[obj.index]
        let approvalRouter = JSON.stringify(routerList)
        localStorage.setItem('approvalType', obj.item.processDefinitionCategory)
        localStorage.setItem('approvalTargetId', obj.item.targetId)
        localStorage.setItem('approvalRouter', approvalRouter)
        state.approvalType = obj.item.processDefinitionCategory
        state.approvalTargetId = obj.item.targetId
        state.approvalRouter = approvalRouter
        this.commit('setProjectLocalStorage', e)
        router.push({
          name: routerList[obj.index],
          params: {
            id: obj.item.targetId,
            isCheck: obj.index === 0
          }
        })
      }
    })
  },
  // 跳转审批
  toApproval(state, { projectItem, taskItem }) {
    let routerList = taskItem.routerName.split(',')
    projectItem.routerName = routerList[taskItem.index]
    projectItem.isApproval = true
    this.commit('setProjectLocalStorage', projectItem)
    router.push({
      name: routerList[taskItem.index],
      params: {
        id: taskItem.targetId,
        isCheck: parseInt(taskItem.index) === 0
      },
      query: {
        isCheck: true
      }
    })
  },
  // 审批完成
  approvalCompleted(state) {
    router.go(-1)
  }
}

export default {
  state,
  mutations
}
