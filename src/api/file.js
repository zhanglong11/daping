/*
 * @Description:文件接口
 * @Version:
 * @Autor:
 * @Date: 2020-02-21 10:16:26
 * @LastEditTime: 2020-02-21 10:42:59
 */
import axios, { post, get, getDownload } from '@/utils/axios' //bug号：1181、修改人：董渊海、修改时间：2020-03-20
export default {
  //文件列表查询 @author sunboqiang
  getFileList: ids => {
    return axios.file.post('file/manage/list', ids)
  },
  uploadFile: data => {
    return axios.file.post(`/file/commonFile/upload`, data, {
      'Content-Type': 'multipart/form-data'
    })
  },
  //根据id下载文件
  downloadFileById: id => {
    //bug号：1181、修改人：董渊海、修改时间：2020-03-20
    return getDownload(`/noToken/file/commonFile/download/${id}`, {})
  }
}
