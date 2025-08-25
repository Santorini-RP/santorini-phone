import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/yellowpages',
    name: 'yellowpages',
    component: () => import('../index.vue')
  }
]

export default routes
