/*
 * @Description:
 * @Author:
 * @Date: 2020-01-19 15:58:42
 */
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import '@/styles/index.scss' // global css
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/assets/iconfont-document/iconfont.js' //bug号：1176、修改人：董渊海、修改时间：2020-03-20、描述：文件记录组件需要引用的图标库
import '@/permission' // permission control

import '@/plugins/vxeTable'
import '@/plugins/vuePromiseBtn'
import '@/plugins/baiduMap'
import axios from '@/utils/axios'

import _ from 'lodash'
import remove from '@/utils/remove'
import Upload from '@/components/Upload'
import Download from '@/components/Download'
import Preview from '@/components/Preview'
import Table from '@/components/Table'
import SelectList from '@/components/SelectList'
import moment from 'moment'
import 'moment/locale/zh-cn'
import api from '@/api'
import BIM from '_c/Bim'
import Archive from '@/components/Archive'
import TreeSelect from '@riophae/vue-treeselect'
import SelectUser from '@/components/SelectUser' // 选择用户
import SelectDepart from '@/components/SelectDepart' // 选择部门
import Grid from '@/components/Grid'
import privilege from '@/directive/privilege'
import InputNumber from '@/components/InputNumber'
import AuditDialog from '@/components/AuditDialog' //审核弹出框
import FileUpload from '@/components/FileUpload'
import FileRecord from '@/components/FileRecord'
import EditTable from '@/components/EditTable'
import moneyFormat from '@/utils/moneyFormat'
import SelectEquipmentDialog from '@/components/SelectEquipmentDialog' //设备台账模态框
import FileList from '_c/FileList'
import DateRange from '@/components/DateRange' //日期选择组件
import FileEdit from '@/components/FileEdit' //编辑页面文件上传组件
import SelectArg from '@/components/SelectArg' //下拉选择器(从参数中获取数据)
import AttachmentDialog from '@/components/AttachmentDialog'
import DownloadByFileId from '@/components/DownloadByFileId' //通过文件id下载
import PreviewByFileId from '@/components/PreviewByFileId' //通过文件id下载
import PreviewUrl from '@/components/PreviewUrl' //通过文件id下载
import ECharts from 'vue-echarts'
import 'echarts'

import toFixed2 from '@/utils/toFixed2'
import fullscreen from 'vue-fullscreen'
import './styles/videoPlayer.less' //视频播放器自定义样式
import Video from '@/components/Video'
import Clipboard from 'v-clipboard'
import tipRemove from '@/utils/tipRemove'
import InputNumberCommon from '@/components/InputNumberCommon'
import PreviewDownload from '@/components/PreviewDownload' //详情页预览下载组件
import VueSignaturePad from 'vue-signature-pad'
import BimTree from '@/components/Bim/bimTree' //bim树
import BimView from '@/components/Bim/bimView' //bim模型
import VueViewerSync from 'vue-viewer-sync'
Modelo.init({ endpoint: 'https://build-portal.modeloapp.com', appToken: store.state.bim.appToken })

moment.locale('zh-cn')
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueViewerSync, {
  el: '#model-wrap'
})
Vue.use(Table)
Vue.use(FileList)
Vue.use(fullscreen)
Vue.use(VueSignaturePad)

Vue.prototype.axios = axios
Vue.use(Clipboard)
Vue.component('VChart', ECharts)

Vue.prototype._ = _
Vue.prototype.$api = api
Vue.prototype.$moneyFormat = moneyFormat
window._ = _
const getLabel = (options, value) => _.get(_.find(options, { value }), 'label', '-')
Vue.prototype.moment = moment
Vue.prototype.$log = console.log
window.moment = moment
Vue.prototype.$remove = remove
Vue.prototype.$tipRemove = tipRemove
Vue.prototype.$getLabel = getLabel
/*
获取系统参数分组数据
group 分组参数
this.$getArgList(group)
*/
Vue.prototype.$getArgList = group =>
  store.state.systemConfig.config[group] &&
  store.state.systemConfig.config[group].children.filter(item => !item.deleteFlag)
/*
  通过value 获取系统参数label
  group 分组参数
  value 参数编码
  this.$getLabelFromArg(group, value)
  */
let $getLabelFromArg = (group, value) =>
  getLabel(store.state.systemConfig.config[group] && store.state.systemConfig.config[group].children, value + '')
window.$getLabelFromArg = $getLabelFromArg
Vue.prototype.$getLabelFromArg = $getLabelFromArg

Vue.component('TreeSelect', TreeSelect)
Vue.component('BIM', BIM)
Vue.component(Grid.name, Grid)
Vue.component(Upload.name, Upload)
Vue.component(Download.name, Download)
Vue.component(Preview.name, Preview)
Vue.component(SelectUser.name, SelectUser)
Vue.component(SelectDepart.name, SelectDepart)
Vue.component(SelectList.name, SelectList)
Vue.component(InputNumber.name, InputNumber)
Vue.component(AttachmentDialog.name, AttachmentDialog)
Vue.component(Video.name, Video)
Vue.component(SelectArg.name, SelectArg)
Vue.component(PreviewDownload.name, PreviewDownload) // 详情页预览下载组件
Vue.component('Archive', Archive) // 归档组件
Vue.component(AuditDialog.name, AuditDialog)
Vue.component(FileUpload.name, FileUpload)
Vue.component(FileRecord.name, FileRecord)
Vue.component(EditTable.name, EditTable)
Vue.component(SelectEquipmentDialog.name, SelectEquipmentDialog)
Vue.component(DateRange.name, DateRange)
Vue.component('FileEdit', FileEdit)
Vue.component(DownloadByFileId.name, DownloadByFileId)
Vue.component(PreviewByFileId.name, PreviewByFileId)
Vue.component('PreviewUrl', PreviewUrl)
Vue.component(InputNumberCommon.name, InputNumberCommon)
Vue.component(BimTree.name, BimTree)
Vue.component(BimView.name, BimView)
Vue.config.productionTip = false
/**
 * 权限全局指令 v-privilege="options"
 */

Vue.directive('access', privilege)
/**
开发人员：耿为刚
日期：2020-05-22
任务类型：拖拽表单组件依赖
**/
import FormMaking from 'drag-form'
import 'drag-form/dist/FormMaking.css'

Vue.use(FormMaking)

/**
开发人员：耿为刚
日期：2020-03-27
任务类型：增加全局过滤器
**/
// 全局过滤器
import * as customFilters from './utils/filters'
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key])
})
Vue.prototype.toFixed2 = toFixed2
Vue.filter('toFixed2', toFixed2)
/**
开发人员：耿为刚
日期：2020-03-28
任务类型：增加全局分页配置
**/
import pageConfig from './utils/page-config'
Vue.prototype.$pageConfig = pageConfig
/*
  是否有按钮操作权限
  true 有权限
  false 无权限
*/

Vue.prototype.$hasPower = e => {
  if (process.env.NODE_ENV === 'development' && localStorage.getItem('ignorePermissions') === 'true') {
    return true
  } else {
    return store.state.userPower.power.includes(e)
  }
}

/**
开发人员：耿为刚
日期：2020-04-01
任务类型：增加全局枚举处理
**/
import Enum from 'vue-enum'
import enumInfo from './enumeration'
Vue.use(Enum, { enumInfo })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import getAccessoryInfo from './utils/getAccessoryInfo'
Vue.use(getAccessoryInfo)
