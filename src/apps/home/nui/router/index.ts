import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/home',
    name: 'home',
    component: () => import('../index.vue')
  }
]

export default routes
