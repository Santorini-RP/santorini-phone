import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/settings',
    name: 'settings',
    component: () => import('../index.vue')
  }
]

export default routes
