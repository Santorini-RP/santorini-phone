import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/apps',
    name: 'apps',
    component: () => import('../index.vue')
  }
]

export default routes
