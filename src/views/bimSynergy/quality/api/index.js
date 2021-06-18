import http from '@/utils/axios'

export default {
  //列表
  list: data => http.construction.post(`/inspectProblem/listAll`, data),

  detail: id => http.construction.get(`/inspectProblem/get/${id}`),

  statics: type => http.construction.get(`/inspectProblem/queryScreenPie/${type}`),

  getQualityModelId: data => http.construction.post(`/quality/problem/bim/batchGet`, data),

  getSafeModelId: data => http.construction.post(`/safety/problem/bim/batchGet`, data)
}
