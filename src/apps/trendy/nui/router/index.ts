import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/trendy',
    name: 'trendy',
    component: () => import('../index.vue')
  }
]

export default routes
