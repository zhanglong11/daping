import { construction } from '@/utils/axios'
const { get, post } = construction
export default {
  //添加领料单
  addOrder: data => {
    return post('/material/receive/bill/add', data)
  },
  //获取列表
  getList: data => {
    return post('/material/receive/bill/list', data)
  },
  deleteOrder: id => {
    return get(`/material/receive/bill/delete/${id}`, {})
  },
  getDetailById: id => {
    return get(`/material/receive/bill/get/${id}`, {})
  },
  updateOrder: data => {
    return post('/material/receive/bill/update', data)
  },
  //获取库存材料
  getMaterialList: data => {
    return post('/project/material/remain/list', data)
  },
  handleCheck: data => {
    return post('/material/receive/bill/update', data)
  }
}
