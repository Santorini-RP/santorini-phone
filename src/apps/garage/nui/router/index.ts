import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/garage',
    name: 'garage',
    component: () => import('../index.vue')
  }
]

export default routes
