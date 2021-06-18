import http from '@/utils/axios'

export default {
  //列表
  default: data => http.construction.post(`/labour/employee/getScreen`, data)
}
