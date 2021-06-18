<template>
  <div class="nav-main" :style="`background: url('${header}') no-repeat`">
    <img :src="logo" class="logo" />
    <div class="nav-menu">
      <ul>
        <template v-for="(item, i) in routes[5].children">
          <li :key="i" :class="{ active: `${item.path}` === activeMenu }">
            <div class="nav-cur" :style="`background: url('${navCur}') 0px 9px no-repeat`"></div>
            <router-link :to="`${item.path}`" class="title">
              {{ item.meta.title }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <div class="nav-right">
      <div class="weather">
        <div v-if="weatherInfo.weatherPic" class="icon">
          <img :src="weatherInfo.weatherPic" style="width: 18px; height: 18px" />
        </div>
        <div v-if="weatherInfo.temperature" class="temperature">{{ weatherInfo.temperature }}℃</div>
      </div>
      <div class="line"></div>
      <div class="time">
        <div class="hms">{{ hms }}</div>
        <div class="ymd">{{ ymd }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../images/header.png'
import logo from '../images/logo.png'
import navCur from '../images/nav-cur.png'
import Api from '../api/index'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      header,
      logo,
      navCur,
      activeMenu: '',
      timer: null,
      hms: '',
      ymd: '',
      weatherInfo: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {
    routes() {
      return this.$router.options.routes
    },
    projectLongitude() {
      return this.$store.state.project.longitude
    },
    projectLatitude() {
      return this.$store.state.project.latitude
    },
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  watch: {
    $route() {
      this.initRoute()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initRoute()
    this.hms = moment().format('LTS')
    this.ymd = moment().format('YYYY[-]MM[-]DD')
    this.countDown()
    this.getWeatherInfo()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  // 方法集合
  methods: {
    // 初始化路由
    initRoute() {
      this.activeMenu = this.$route.meta && this.$route.meta.activeMenu ? this.$route.meta.activeMenu : this.$route.path
    },
    // 倒计时
    countDown() {
      this.timer = setInterval(() => {
        this.hms = moment().format('LTS')
        this.ymd = moment().format('YYYY[-]MM[-]DD')
      }, 1000)
    },
    // 获取天气信息
    getWeatherInfo() {
      // 固定的项目信息参数
      let params = {
        lng: this.projectLongitude,
        lat: this.projectLatitude,
        projectId: this.projectId
      }
      Api.getWeatherInfo(params).then(res => {
        this.weatherInfo = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-main {
  margin: 0 auto;
  height: 78px;
  display: flex;
  position: relative;
  z-index: 10;

  .logo {
    margin-top: 22px;
    margin-left: 34px;
    width: 172px;
    height: 24px;
  }

  .nav-menu {
    flex: 1;
    ul {
      display: flex;
      align-items: center;
      width: 875px;
      height: 50px;
      margin-left: 450px;
      margin-top: 4px;

      li {
        width: 125px;
        height: 50px;
        position: relative;
        .nav-cur {
          opacity: 0;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          position: absolute;
          z-index: -1;
          transition: opacity 0.4s;
        }
        .title {
          color: #b9b9b9;
          display: flex;
          height: 50px;
          align-items: center;
          justify-content: center;
        }
        &:hover,
        &.active {
          .nav-cur {
            opacity: 1;
          }
          .title {
            color: #ffb126;
            text-shadow: 0px 0px 5px #d69f3d;
          }
        }
      }
    }
  }

  .nav-right {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
    color: #ffffff;
    font-size: 14px;
    margin-top: 4px;
    justify-content: flex-end;
    margin-right: 10px;
    .weather {
      display: flex;
      .icon {
        margin-right: 10px;
      }
      .temperature {
        font-weight: 600;
        margin-right: 2px;
      }
    }
    .line {
      width: 1px;
      height: 20px;
      background: #ffffff;
      margin: 0px 10px;
    }
    .time {
      .ymd {
        color: #b9b9b9;
      }
    }
  }
}
</style>
