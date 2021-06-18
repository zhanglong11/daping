import axios from '@/utils/axios'
export default {
  //租赁计划列表
  getLeasePlanList: data => {
    return axios.construction.post('/material/plan/list', data)
  },
  //新增租赁计划
  addLeasePlan: data => {
    return axios.construction.post('/material/plan/add', data)
  },
  //编辑租赁计划
  editLeasePlan: data => {
    return axios.construction.post('/material/plan/update', data)
  },
  //获取租赁计划详情
  getLeasePlanDetail: id => {
    return axios.construction.get(`/material/plan/get/${id}`)
  },
  //删除租赁计划
  deleteLeasePlan: id => {
    return axios.construction.get(`/material/plan/delete/${id}`)
  }
}
