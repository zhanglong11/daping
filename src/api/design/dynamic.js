/*
 * @Description:动态模块接口
 * @Author:
 * @Date: 2020-01-19 09:11:06
 */
import { design } from '@/utils/axios'
const { post, get } = design
export default {
  //获取动态列表
  getDynamicList: data => {
    return post('/project/trend/list', data)
  },
  addDynamic: data => {
    return post('/project/trend/add', data)
  },
  // 大事记新增
  addBreakingNews: data => {
    return post('/project/event/add', data)
  },
  // 大事记新增
  editBreakingNews: data => {
    return post('/project/event/update', data)
  },
  //获取大事记列表
  getBreakList: data => {
    return post('/project/event/list', data)
  },
  //删除大事记
  deleteBreak: id => {
    return get(`/project/event/delete/${id}`, {})
  },
  // 大事记详情
  breakingNewsDetails: id => {
    return get(`/project/event/get/${id}`, {})
  }
}
