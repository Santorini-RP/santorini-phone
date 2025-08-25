import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/music',
    name: 'music',
    component: () => import('../index.vue')
  }
]

export default routes
