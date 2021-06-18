import Vue from 'vue'
import Router from 'vue-router'
import { baseRouter } from '@/views/base/baseRouter' // 基础路由管理
import { bimSynergyRouter } from '@/views/bimSynergy/router' // 甲方大屏路由
Vue.use(Router)

// 处理开发路由，不进行权限处理
let developmentRoute = [
  // 开发完毕上线要删除，走权限控制
]
let developmentRouteNames = []
const formatDevelopmentRoute = array => {
  array.map(item => {
    if (!item.name) {
      return
    }
    developmentRouteNames.push(item.name)
    if (item.children) {
      formatDevelopmentRoute(item.children)
    }
  })
}
formatDevelopmentRoute(developmentRoute)
Vue.prototype.$DevelopmentRoute = developmentRouteNames

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  ...baseRouter, // 基础路由管理
  ...bimSynergyRouter // 甲方大屏路由
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    //mode: 'history',
    routes: constantRoutes
  })

const router = createRouter()
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
