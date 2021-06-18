<template>
  <div class="base-con">
    <div class="base-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item index="2">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">信息推送</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="base-body app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {
    key() {
      return this.$route.path
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.base-con {
  display: flex;
  height: 100%;
  .base-menu {
    width: 210px;
    background-color: rgb(84, 92, 100);
  }
  .base-body {
    flex: 1;
    padding: 15px;
    border-radius: 6px;
    height: 100%;
    > div {
      height: 100%;
    }
  }
}
</style>
