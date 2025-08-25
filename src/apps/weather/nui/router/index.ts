import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/weather',
    name: 'weather',
    component: () => import('../index.vue')
  }
]

export default routes
