<template>
  <div class="wrap">
    <div class="main"></div>
    <div class="progress" :style="{ width: progress + '%' }"></div>

    <div
      v-for="(item, i) in scaleData"
      :key="i"
      :class="['scale', (i / (scaleData.length - 1)) * 100 <= progress ? 'active' : '']"
      :style="{ left: (i / (scaleData.length - 1)) * 100 + '%' }"
    >
      <i></i>
      <p>{{ item.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  // import引入的组件
  components: {},
  props: {
    progress: {
      default: 30,
      type: Number
    }
  },
  data() {
    // 这里存放数据
    return {
      scaleData: [
        {
          label: '开始施工'
        },
        {
          label: '施工前期工作'
        },
        {
          label: '施工前期工作'
        }
      ]
    }
  },
  // 生命周期 - 挂载完成
  created() {},
  // 方法集合
  methods: {
    //刷新
    refresh() {}
  }
}
</script>

<style scoped lang="less">
.wrap {
  height: 30px;
  position: relative;
  margin: 10px 60px;
  .main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: #3a2f1f;
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: #f1c871;
  }
  .scale {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    margin-left: -50px;
    margin-top: -5px;
    text-align: center;
    &.active {
      > i {
        background: #f1c871;
      }
    }
    > i {
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
      border-radius: 50%;
      background: #3a2f1f;
    }
    > p {
      margin-top: 6px;
      color: #70695b;
    }
  }
}
</style>
