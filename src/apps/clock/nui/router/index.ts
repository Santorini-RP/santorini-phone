import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/clock',
    name: 'clock',
    component: () => import('../index.vue')
  }
]

export default routes
