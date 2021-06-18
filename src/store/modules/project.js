/*
 * @Author: 耿为刚 创建
 * @Date: 2020-03-27
 * @Last Modified by: gengweigang
 * @Last Modified time: 2020-11-25 14:11:07
 */
import router from '@/router'
import { getProjectList } from '@/api/user'
const state = {
  // 添加项目的弹窗
  addProjectDialog: false,
  projectId: localStorage.getItem('projectId') || '', // 项目id
  projectUserCategory: localStorage.getItem('projectUserCategory') || '', //项目人员分类
  projectName: localStorage.getItem('projectName') || '', //项目名称
  projectType: localStorage.getItem('projectType') || '', // 项目类型
  latitude: localStorage.getItem('latitude') || '', // 项目位置
  longitude: localStorage.getItem('longitude') || '',
  projectDetail: localStorage.getItem('projectDetail') ? JSON.parse(localStorage.getItem('projectDetail')) : {}, //项目详情
  projectList: []
}

const mutations = {
  // 消息中转处理
  toMessageDetails(state, { projectItem, subModulesRouterName }) {
    this.commit('setProjectLocalStorage', projectItem)
    router.push({
      name: subModulesRouterName,
      params: {
        id: projectItem.targetId
      },
      query: {
        id: projectItem.targetId
      }
    })
  },
  // 设置项目缓存
  setProjectLocalStorage(state, obj) {
    this.commit('user/SET_COMPANY_ID', obj.companyId)
    localStorage.setItem('projectId', obj.id)
    localStorage.setItem('projectType', obj.type)
    localStorage.setItem('projectName', obj.name)
    localStorage.setItem('projectUserCategory', obj.projectUserCategory)
    localStorage.setItem('projectDetail', JSON.stringify(obj))
    state.projectId = obj.id
    state.projectName = obj.name
    state.projectType = obj.type
    state.projectUserCategory = obj.projectUserCategory
    state.projectDetail = obj
    this.commit('setLocal', {
      latitude: obj.latitude,
      longitude: obj.longitude
    })
    /*if (process.env.NODE_ENV === 'development' && !obj.isApproval) {
      this.commit('setWebTitle', {
        serviceCode: obj.type,
        webTitle: '本地开发'
      })
      this.commit('getPower', () => {
        let firstPowerRoute = 'CenterHome'
        if (router.history.current.name === firstPowerRoute) {
          location.reload()
        } else {
          // 判断有没有公告管理权限
          if (this.state.userPower.power.includes('Notice')) {
            router.push({
              name: 'Notice'
            })
          } else {
            router.push({
              name: firstPowerRoute
            })
          }
        }
        this.dispatch('design/getProjectDetail')
        this.dispatch('setSystemConfigStorage')
      })
      return
    } else {
      this.commit('setWebTitle', {
        serviceCode: obj.type,
        webTitle: '本地开发'
      })
      this.commit('getPower', () => {
        this.dispatch('design/getProjectDetail')
        this.dispatch('setSystemConfigStorage')
      })
    }
    let firstPowerRoute = 'CenterHome'
    if (!obj.routerName) {
      if (router.history.current.name === firstPowerRoute) {
        location.reload()
      } else {
        router.push({
          name: firstPowerRoute
        })
      }
    }*/
  },
  // 单独设置项目id
  setProjectId(state, projectId) {
    localStorage.setItem('projectId', projectId)
    state.projectId = projectId
  },
  // 单独设置项目人员分类
  setProjectUserCategory(state, projectUserCategory) {
    localStorage.setItem('projectUserCategory', projectUserCategory)
    state.projectUserCategory = projectUserCategory
  },
  // 单独设置项目名称
  setProjectName(state, projectName) {
    localStorage.setItem('projectName', projectName)
    state.projectName = projectName
  },
  // 单独设置项目详情
  setProjectDetail(state, projectDetail) {
    localStorage.setItem('projectDetail', JSON.stringify(projectDetail))
    state.projectDetail = projectDetail
  },
  // 单独设置项目经纬度
  setLocal(state, obj) {
    localStorage.setItem('latitude', obj.latitude)
    localStorage.setItem('longitude', obj.longitude)
    state.latitude = obj.latitude
    state.longitude = obj.longitude
  },
  // 设置 添加项目弹窗的状态
  setAddProjectDialog(state, visible) {
    state.addProjectDialog = visible
  },
  // 单独设置项目类型
  setProjectType(state, projectType) {
    localStorage.setItem('projectType', projectType)
    state.projectType = projectType
  }
}

const actions = {
  // 查询项目列表
  queryProjectList({ state }) {
    return getProjectList({ page: 1, rows: 1000 }).then(res => {
      state.projectList = res.data.records
    })
  }
}

export default {
  state,
  mutations,
  actions
}
