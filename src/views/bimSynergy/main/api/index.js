import axios from '@/utils/axios'

export default {
  // 获取视频列表
  getMonitorVideoList: data => axios.iot.post(`/monitor/device/queryList`, data),

  // 获取视频播放地址
  getVideoUrl: data => axios.iot.post(`/monitorVideo/start`, data),

  // 视频实时直播
  touch: data => axios.iot.post(`/monitorVideo/touch`, data),

  // 本月问题统计(质量与安全)
  getInspectProblemQueryBar: data => axios.construction.post(`/inspectProblem/queryBar`, data),

  // 本月进度统计
  getScheduleTask: () => axios.construction.get(`/schedule/task/bigScreen/panel`),

  //获取模型进度
  getModelProgress: data => axios.construction.post(`/schedule/bim/cycle/list`, data)
}
