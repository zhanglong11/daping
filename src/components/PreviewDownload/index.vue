<template>
  <el-button-group style="float: right">
    <el-button type="primary" @click="preview"> 预览 </el-button>
    <el-button type="primary" @click="download"> 下载 </el-button>
    <el-dialog
      v-if="visible"
      title="预览"
      append-to-body
      width="1000px"
      destroy-on-close
      :visible="visible"
      @close="visible = false"
    >
      <iframe ref="iframe" width="100%" style="height: 60vh" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">确定</el-button>
      </span>
    </el-dialog>
  </el-button-group>
</template>

<script>
import { saveAs } from 'file-saver'
export default {
  name: 'PreviewDownload',
  props: {
    type: {
      required: true
    },
    url: {
      required: true
    },
    id: {
      required: true
    },
    fileName: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    preview() {
      this.visible = true
      setTimeout(async () => {
        const res = await this.axios[this.type].get(`${this.url}/1/${this.id}`, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
        this.$refs.iframe.src = url
      })
    },
    async download() {
      const res = await this.axios[this.type].get(`${this.url}/0/${this.id}`, { responseType: 'blob' })
      saveAs(res.data, this.fileName ? this.fileName : '')
    }
  }
}
</script>

<style scoped></style>
