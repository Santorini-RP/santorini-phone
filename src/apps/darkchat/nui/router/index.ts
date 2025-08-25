import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/darkchat',
    name: 'darkchat',
    component: () => import('../index.vue')
  }
]

export default routes
