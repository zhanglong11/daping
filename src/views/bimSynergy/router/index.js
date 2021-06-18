/* 甲方大屏路由 */
import Layout from '../index'
/**
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则breadcrumb中不会重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             图标显示在侧栏中,支持/src/icons/svg格式和element-ui icon两种形式
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */
export const bimSynergyRouter = [
  {
    path: '/',
    name: 'BimSynergy',
    component: Layout,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () => import('../main'),
        meta: { title: '首页' }
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('../video'),
        meta: { title: '视频监控' }
      },
      {
        path: '/labour',
        name: 'Labour',
        component: () => import('../labour'),
        meta: { title: '劳务管理' }
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../schedule/index3'),
        meta: { title: '进度展示' }
      },
      {
        path: '/quality',
        name: 'Quality',
        component: () => import('../quality'),
        meta: { title: '质量展示', type: 1 }
      },
      {
        path: '/safety',
        name: 'Safety',
        component: () => import('../quality'),
        meta: { title: '安全展示', type: 2 }
      },
      {
        path: '/backstage',
        name: 'Backstage',
        component: () => import('../backstage'),
        meta: { title: '后台管理' }
      }
    ]
  }
]
