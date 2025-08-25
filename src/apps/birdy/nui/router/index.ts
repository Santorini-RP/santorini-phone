import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/birdy',
    name: 'birdy',
    component: () => import('../index.vue')
  }
]

export default routes
