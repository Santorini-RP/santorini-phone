import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/home',
    component: () => import('../index.vue'),
    meta: {
      appId: 'home',
      noCorePadding: true,
    },
    children: [
      {
        path: '',
        name: 'home-list',
        component: () => import('../pages/HomeList.vue'),
        meta: { transition: 'fade' }
      },
      {
        path: ':homeId',
        name: 'home-detail',
        component: () => import('../pages/HomeDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      }
    ]
  }
]

export default routes
