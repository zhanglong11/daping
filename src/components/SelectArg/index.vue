<!--
 -->
<template>
  <el-select :value="value" :disabled="disabled" :multiple="multiple" @change="val => $emit('input', val)">
    <template v-if="hasAll">
      <el-option :value="null" label="全部"> </el-option>
    </template>
    <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectArg',
  props: {
    hasAll: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    argGroup: {
      type: String,
      required: true
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    list() {
      return this.$store.state.systemConfig.config[this.argGroup]?.children
    }
  }
}
</script>
<style lang="less" scoped></style>
