import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/wallet',
    name: 'wallet',
    component: () => import('../index.vue')
  }
]

export default routes
