<template>
  <div class="layout-main">
    <Navbar></Navbar>
    <div class="content-wrap">
      <transition name="fade">
        <router-view :key="key"></router-view>
      </transition>
    </div>
    <BimView ref="bim" />
  </div>
</template>

<script>
import Navbar from './componments/Navbar'
import bg from './images/bg.jpg'
import Api from './api/index'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Navbar },
  data() {
    // 这里存放数据
    return {
      bg
    }
  },
  computed: {
    key() {
      let pathRoute = this.$route.path
      return pathRoute
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    init() {
      // 初始化背景
      document.body.style.background = `url('${bg}') center no-repeat`
      document.body.style.backgroundSize = 'cover'

      this.onresize()

      //获取模型id
      this.$store.dispatch('bim/setBimModelId')
      //绑定参数
      this.$store.dispatch('setSystemConfigStorage')

      // 获取项目项目信息
      Api.getProjectInfo('32407143162388900').then(res => {
        let info = res.data
        let newInfo = {
          ...info,
          ...{ longitude: info?.longitude || null, latitude: info?.latitude || null }
        }
        this.$store.commit('setProjectLocalStorage', newInfo)
      })
    },
    // 监听窗口改变
    onresize() {
      document.getElementsByClassName('layout-main')[0].style.transform = ''
      this.$nextTick(() => {
        let clientWidth = document.documentElement.clientWidth
        let clientHeight = document.documentElement.clientHeight
        window.onresize = () => {
          // 定义窗口大小变更通知事件
          clientWidth = document.documentElement.clientWidth //窗口宽度
          clientHeight = document.documentElement.clientHeight //窗口高度
          this.changeLayoutMain(clientWidth, clientHeight)
        }
        this.changeLayoutMain(clientWidth, clientHeight)
      })
    },
    // 自动缩放
    changeLayoutMain(clientWidth, clientHeight) {
      const defaultWidth = 1920
      let layoutMain = document.getElementsByClassName('layout-main')
      let mainHeight = layoutMain[0].clientHeight
      let proportion = clientWidth / defaultWidth
      if (clientHeight < mainHeight) {
        proportion = clientHeight / mainHeight
      }
      if (clientWidth < defaultWidth || clientHeight < mainHeight) {
        layoutMain[0].style.transform = `scale(${proportion})`
      } else {
        layoutMain[0].style.transform = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-main {
  transform-origin: center 0;
  transition: all 0.4s;
  min-height: 100%;
  width: 1920px;
  margin: 0 auto;

  .content-wrap {
    color: #ffffff;

    .fade-enter-active {
      animation: fadeIn 0.5s;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .fade-enter-active {
      display: block;
    }

    .fade-leave-active {
      display: none;
    }
  }
}
</style>
