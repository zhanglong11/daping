import { construction } from '@/utils/axios'
const { get, post } = construction
const projectId = localStorage.getItem('projectId')
export default {
  //耗料清单
  addOrder: data => {
    return post('/material/consume/inventory/bill/add', data)
  },
  //获取列表
  getList: data => {
    return post('/material/consume/inventory/bill/list', data)
  },
  deleteOrder: id => {
    return get(`/material/consume/inventory/bill/delete/${id}`, {})
  },
  getDetailById: id => {
    return get(`/material/consume/inventory/bill/get/${id}`, {})
  },
  updateOrder: data => {
    return post('/material/consume/inventory/bill/update', data)
  },
  getPickOrderDetailById: id => {
    return get(`/material/receive/bill/get/${id}`, {})
  },
  //耗料入库
  comsumeInstore: data => {
    return post(`/material/stock/put/${projectId}`, data)
  }
}
