import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/spark',
    name: 'spark',
    component: () => import('../index.vue')
  }
]

export default routes
