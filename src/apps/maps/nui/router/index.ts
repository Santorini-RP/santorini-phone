import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/maps',
    name: 'maps',
    component: () => import('../index.vue')
  }
]

export default routes
