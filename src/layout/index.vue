<template>
  <div v-if="$route.meta.hiddenLayout">
    <app-main></app-main>
  </div>
  <div v-else-if="$route.meta.hiddenSidebar" :class="classObj" class="app-wrapper">
    <navbar />
    <app-main></app-main>
  </div>
  <div v-else :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
      <!--<RightPanel :buttonBottom="150" iconDesc="项目讨论区" @close="clearForm">
        <chat ref="chat" />
      </RightPanel>-->
    </div>
  </div>
</template>

<script>
// import RightPanel from './components/RightPanel/index'
import { Navbar, Sidebar, AppMain /*Chat*/ } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
    /*Chat,
    RightPanel*/
  },
  mixins: [ResizeMixin],
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    accessList() {
      return this.$store.state.app.accessList
    },
    // 是否显示头部菜单
    isShowHeaderMenu() {
      return this.$route.path.indexOf('/work-bench/') < 0
    },
    token() {
      return this.$store.state.user.token
    }
  },
  created() {
    //this.$store.dispatch('app/getPermissionList')
    if (this.isShowHeaderMenu && !this.$route.meta.dontGetProject) {
      // 工作台和首页不执行
      this.$store.dispatch('design/getProjectDetail')
    }
    this.$store.dispatch('user/getInfo')
    if (this.token) this.getPower()
  },
  methods: {
    clearForm() {
      this.$refs.chat.clearForm()
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getPower() {
      if (!this.token) {
        return
      }
      if (this.$route.name !== 'CompanyCenter') {
        this.$store.commit('getPower')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 901;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
