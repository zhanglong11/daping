/*
 * @Description:
 * @Author:
 * @Date: 2020-01-09 18:05:43
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/getPageTitle'
import { getOrigin } from '@/utils'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/share', '/qrCode'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // console.log(to)
  // set page title
  let webTitle = store.state.userPower.webTitle
  document.title = `${webTitle} - ${to.meta.title}`

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken || to.name === 'ToAdmin') {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // 权限拦截，无权限跳转404页面
      // const power = store.state.userPower.power
      // if (!power.includes(to.name) && to.name !== '404') {
      //   next('/404')
      //   NProgress.done()
      //   return
      // }
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/logout')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    let flag = false
    for (let i = 0; i < whiteList.length; i++) {
      if (to.path.indexOf(whiteList[i]) !== -1) {
        flag = true
      }
    }
    if (flag) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  // store.commit('bim/changeMajor', [])
  // store.commit('bim/changeSingle', [])
  // store.commit('bim/changeVersionModelIds', [])
})
