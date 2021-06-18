import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const timeout = 30000
let urlSuffix = process.env.VUE_APP_BASE_API
// urlSuffix = '-test'
const fileUrl = `/cim6d-file${urlSuffix}`
const service = create('/cim6d-system' + urlSuffix)
const system = create('/cim6d-system' + urlSuffix)
//const service = create('/cim6d-system-test_byk')
const design = create('/cim6d-design' + urlSuffix) //设计模块
const schedule = create('/cim6d-construction' + urlSuffix + '/schedule') // 进度模块
const construction = create('/cim6d-construction' + urlSuffix)
// const construction = create('/cim6d-construction-test_byk')
const workflow = create('/cim6d-process' + urlSuffix) // 工作流
const gis = create('/cim6d-bim-light' + urlSuffix)
const file = create(fileUrl) // 智慧施工2.0工作台
const working = create('/cim6d-construction' + urlSuffix) // 智慧施工2.0 工序进度
const safety = create('/cim6d-quality-safety' + urlSuffix) //安全模块

// const labour = create(`/cim6d-construction${urlSuffix}-nht/labour`) //劳务模块--测试-连接牛湖涛电脑

const labour = create(`/cim6d-construction${urlSuffix}/labour`) //劳务模块 测试连接本地电脑
const labourSafety = create(`/cim6d-construction${urlSuffix}/safety`) //劳务安全
const iot = create(`/cim6d-iot${urlSuffix}`) // 物联网
const iotEquipmentMonitor = create(`/cim6d-iot${urlSuffix}`) // 设备监控
const bimSynergy = create('/cim6d-bim-synergy' + urlSuffix) // bim协同
const decoration = create(`/cim6d-construction${urlSuffix}`) // 精装修项目工序相关
const global = create('/cim6d-global' + urlSuffix) //用于获取权限树
const material = create('/cim6d-construction' + urlSuffix) //材料设备，精装修项目
const model = create('/cim6d-quality-safety' + urlSuffix) //模型管理
const admin = create('/cim6d-admin' + urlSuffix) //超管系统

service.admin = admin
service.design = design
service.schedule = schedule
service.construction = construction
service.workflow = workflow
service.gis = gis
service.system = system
service.file = file
service.working = working
service.safety = safety
service.labour = labour
service.labourSafety = labourSafety
service.iot = iot
service.iotEquipmentMonitor = iotEquipmentMonitor
service.decoration = decoration
service.bimSynergy = bimSynergy
service.global = global
service.material = material
service.model = model

// service.found = found
export default service
export const filePreviewUrl = fileUrl
export {
  system,
  design,
  schedule,
  construction,
  workflow,
  gis,
  service,
  file,
  working,
  safety,
  labour,
  labourSafety,
  iot,
  iotEquipmentMonitor,
  bimSynergy,
  decoration,
  global,
  material,
  model,
  fileUrl
}

export const post = (url, data, config = {}) => {
  return service.post(url, data, config)
}
export const get = (url, data) => {
  return service.get(url, {
    params: data
  })
}
export const getDownload = (url, data) => {
  return file.get(url, {
    params: data,
    responseType: 'blob'
  })
}

function create(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout
  })
  addInterceptor(instance)
  return instance
}
function addInterceptor(service) {
  // request interceptor
  service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['x-access-token'] = getToken()
      }
      if (localStorage.getItem('projectId')) {
        config.headers['project-id'] = localStorage.getItem('projectId')
      }
      config.headers['platform'] = 'construction'
      config.headers['application-type'] = 'pc'
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
        return response
      }
      if (response.config.url.indexOf('.json') > -1 && response.data instanceof Array) {
        return response.data
      }

      // if the custom code is not 20000, it is judged as an error.
      if (response.status === 200 && !response.data) {
        return errorHandler('status: 200 服务器没有返回任何响应')
      } else if (response.data.code === 1000) {
        store.dispatch('user/logout')
      } else if (!response.data.success && response.data.code !== 200) {
        const message = response.data.message || response.data.msg || 'Error'
        Message({
          message,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(new Error(message))
      } else {
        return response.data
      }
    },
    error => {
      return errorHandler(
        'status: ' + _.get(error, 'response.status') + ' ' + error.message || _.get(error, 'response.data.message')
      )
    }
  )
}

/**
 * 弹出错误提示,生产环境只提示服务重启或者维护中，请稍后重试
 * @param message
 */
function errorHandler(message) {
  const isEnv = process.env.NODE_ENV === 'development'
  Message({
    message: isEnv ? message : '服务重启或者维护中，请稍后重试',
    type: 'error',
    duration: 2 * 1000
  })
  return Promise.reject(new Error(message))
}
