import axios from '@/utils/axios'

export default {
  // 获取项目信息
  getProjectInfo: projectId => axios.system.get(`/cim6d/system/project/get/${projectId}`),

  // 获取天气
  getWeatherInfo: data => axios.system.post(`/weather/info`, data)
}
