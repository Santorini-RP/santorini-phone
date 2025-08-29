import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/services',
    component: () => import('../index.vue'),
    redirect: '/app/services/companies',
    children: [
      {
        path: 'companies',
        name: 'services-companies',
        component: () => import('../pages/Companies.vue'),
      },
      {
        path: 'messages',
        name: 'services-messages',
        component: () => import('../pages/Messages.vue'),
      },
      {
        path: 'actions',
        name: 'services-actions',
        component: () => import('../pages/Actions.vue'),
      }
    ]
  }
]

export default routes
