import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/garage',
    component: () => import('../index.vue'),
    meta: {
      appId: 'garage',
      noCorePadding: true,
    },
    children: [
      {
        path: '',
        name: 'garage-home',
        component: () => import('../pages/Home.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: ':carId',
        name: 'garage-detail',
        component: () => import('../pages/CarDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      }
    ]
  }
]

export default routes
