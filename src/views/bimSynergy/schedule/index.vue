<template>
  <div class="content">
    <div class="schedule">
      <div class="left">
        <div class="monomerTower" :style="`background: url('${monomerTower}') no-repeat`"></div>
        <div class="departmentType" :style="`background: url('${departmentType}') no-repeat`"></div>
      </div>
      <div class="center">
        <div class="modelView" :style="`background: url('${modelView}') no-repeat`"></div>
        <div class="progressSimulate" :style="`background: url('${progressSimulate}') no-repeat`"></div>
      </div>
    </div>
  </div>
</template>

<script>
import monomerTower from '../images/schedule/monomer-tower.png'
import departmentType from '../images/schedule/department-type.png'
import modelView from '../images/schedule/model-view.png'
import progressSimulate from '../images/schedule/progress-simulate.png'
export default {
  data() {
    return {
      monomerTower,
      departmentType,
      modelView,
      progressSimulate
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.onresize()
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.schedule {
  display: flex;
  .left {
    width: 400px;
    .monomerTower {
      width: 365px;
      height: 465px;
      margin: 20px auto 0px auto;
    }
    .departmentType {
      width: 365px;
      height: 465px;
      margin: 33px auto 0px auto;
    }
  }
  .center {
    flex: 1;
    .modelView {
      width: 1470px;
      height: 636px;
      margin: 20px auto 0px auto;
    }
    .progressSimulate {
      width: 1470px;
      height: 303px;
      margin: 25px auto 0px auto;
    }
  }
}
</style>
