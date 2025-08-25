import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/camera',
    name: 'camera',
    component: () => import('../index.vue')
  }
]

export default routes
