import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/crypto',
    name: 'crypto',
    component: () => import('../index.vue')
  }
]

export default routes
