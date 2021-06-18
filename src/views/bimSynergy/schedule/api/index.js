import http from '@/utils/axios'

export default {
  list: data => http.construction.post('/schedule/task/list', data),

  bimList: data => http.construction.post('/schedule/task/simulateTime', data)
}
