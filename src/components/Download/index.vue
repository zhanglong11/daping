<template>
  <a v-if="customUrl" type="text" @click="download"><slot>下载</slot></a>
  <a
    v-else
    type="text"
    :class="{ disabled: !file }"
    :title="!file ? '文件已不存在' : ''"
    :href="href"
    :download="file.fileName"
  >
    <slot>下载</slot>
  </a>
</template>

<script>
import qs from 'qs'
import contentDisposition from 'content-disposition'
import axios from '@/utils/axios'
export default {
  name: 'Download',
  props: {
    file: {
      type: Object, // should be {fileName:'',filePath:''}
      default: null
    },
    customUrl: {
      type: String,
      default: null
    },
    customHttpMethod: {
      type: String,
      default: 'get'
    }
  },
  computed: {
    href() {
      return axios.file.defaults.baseURL + '/noToken/file/commonFile/download/' + this.file.id
    }
  },
  methods: {
    download() {
      const a = document.createElement('a')
      this.axios.get(this.customUrl, { responseType: 'blob', timeout: 3000000 }).then(res => {
        a.href = URL.createObjectURL(res.data)
        a.download =
          _.get(this.file, 'fileName', '') ||
          contentDisposition.parse(res.headers['content-disposition']).parameters.filename
        a.click()
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-button {
  a {
    color: inherit;
  }
}
.disabled {
  color: #333;
  cursor: not-allowed;
}
</style>
