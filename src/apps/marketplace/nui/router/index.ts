import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/marketplace',
    name: 'marketplace',
    component: () => import('../index.vue')
  }
]

export default routes
