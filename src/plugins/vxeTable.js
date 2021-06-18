import Vue from 'vue'
import 'vxe-table/lib/index.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import VXTable from '@/components/VxeTable'
VXETable.use(VXETablePluginElement)

Vue.prototype.XEUtils = XEUtils
Vue.use(VXTable)

VXETable.setup({
  table: {
    size: 'small',
    stripe: true,
    align: 'center',
    border: true,
    resizable: true,
    showOverflow: 'title',
    checkboxConfig: {
      trigger: 'cell'
    },
    showHeaderOverflow: false
  }
})
VXETable.formats.mixin({
  ymd({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
  },
  toWan({ cellValue }) {
    return cellValue || cellValue === 0 ? cellValue / 10000 : ''
  }
})
Vue.use(VXETable)
