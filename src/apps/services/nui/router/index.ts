import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/services',
    name: 'services',
    component: () => import('../index.vue')
  }
]

export default routes
