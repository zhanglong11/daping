<template>
  <div class="app-main-wrap">
    <Breadcrumb v-if="!$route.meta.hiddenLayout && !$route.meta.hiddenSidebar" class="breadcrumb-container" />
    <div v-if="isChildren">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
    <section v-else class="app-main" :class="{ hiddenLayout: $route.meta.hiddenLayout }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="key" />
        </keep-alive>
      </transition>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" :key="key" />
      </transition>
    </section>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  props: {
    // 是否有三级路由
    isChildren: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="less">
.app-main-wrap {
  display: flex;
  flex-direction: column;
}
.app-main {
  /*50 = navbar  */
  width: 100%;
  min-width: 1000px;
  position: relative;
  padding: 0 20px 20px;
  overflow: hidden;
  &.hiddenLayout {
    padding: 0;
    > div {
      padding: 0;
      margin-top: 0;
    }
  }
  > div {
    background-color: #fff;
    min-height: calc(100vh - 90px);
    padding: 20px 20px 0 20px;
  }
}

.breadcrumb-container {
  margin-top: 50px;
  padding-left: 12px;
}
</style>
