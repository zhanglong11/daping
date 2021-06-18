<template>
  <div>
    <el-upload
      class="upload"
      :headers="headers"
      :action="axios.file.defaults.baseURL + '/file/commonFile/upload'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :multiple="multiple"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :disabled="disabled"
    >
      <el-button size="small" :disabled="disabled">上传文件</el-button>
      <div v-show="show" slot="tip" class="el-upload__tip">支持扩展名：{{ accept.join(',') }}</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'FileUploadWithImg',
  props: {
    disabled: Boolean,
    multiple: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    limit: {
      type: [String, Number],
      default: 3
    },
    fileRecover: Array,
    accept: { type: Array, default: () => ['rar', 'zip', 'doc', 'docx', 'pdf', 'jpg'] }
  },
  data() {
    return {
      fileList: [],
      headers: {
        'x-access-token': getToken()
      },
      fileIds: []
    }
  },
  watch: {
    fileRecover(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.fileList.push({
          name: val[i].fileName,
          url: val[i].fileUrl,
          response: { data: val[i].id }
        })
        this.fileIds.push(val[i].id)
      }
      this.$emit('input', this.fileIds)
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      //console.log(file)
      //console.log(fileList)
      let fileId = file.response.data
      let index = null
      for (let i = 0; i < this.fileIds.length; i++) {
        if (this.fileIds[i] === fileId) {
          index = i
          break
        }
      }
      if (index !== null) {
        this.fileIds.splice(index, 1)
      }
      this.$emit('input', this.fileIds)
      this.$emit('change', this.fileIds)
    },
    beforeUpload(file) {
      let name = file.name.split('.')
      if (this.accept.indexOf(name[name.length - 1]) < 0) {
        this.$message.error('请上传正确格式的文件')
        return false
      }
    },
    beforeRemove(file, fileList) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.fileIds.push(response.data)
        this.$emit('input', this.fileIds)
        this.$emit('change', this.fileIds)
        this.$emit('fileName', file.name)
      } else {
        this.$message.error(response.message)
      }
    },
    handleError(err, file, fileList) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang="less">
.upload {
  width: 400px;
}
</style>
<style lang="less">
.upload {
  .el-upload {
    text-align: left;
  }
}
</style>
