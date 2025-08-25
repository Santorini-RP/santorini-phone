import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/phone',
    name: 'phone',
    component: () => import('../index.vue')
  }
]

export default routes
