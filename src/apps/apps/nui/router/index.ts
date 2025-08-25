import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/apps',
    component: () => import('../index.vue'),
    meta: { 
      appId: 'apps', 
      noCorePadding: true,
      title: 'Apps' 
    },
    children: [
      {
        path: '',
        name: 'apps-home',
        component: () => import('../pages/Home.vue'),
        meta: { transition: 'fade' }
      },
      {
        path: ':appId',
        name: 'apps-detail',
        component: () => import('../pages/AppDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      },
    ]
  }
]

export default routes
