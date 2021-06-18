import { systemRouter } from './system/router' // 基础管理路由
// 基础路由管理
export const baseRouter = [
  {
    path: '/login',
    // hidden: true,
    component: () => import('./login'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/to-admin', // 其他系统token中转页面
    // hidden: true,
    name: 'ToAdmin',
    component: () => import('./to-admin'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('./404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    component: () => import('./404'),
    hidden: true
  },
  ...systemRouter
]
