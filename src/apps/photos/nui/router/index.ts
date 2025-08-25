import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/photos',
    name: 'photos',
    component: () => import('../index.vue')
  }
]

export default routes
