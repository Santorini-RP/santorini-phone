import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/calculator',
    name: 'calculator',
    component: () => import('../index.vue')
  }
]

export default routes
