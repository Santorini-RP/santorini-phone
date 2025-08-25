import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/messages',
    name: 'messages',
    component: () => import('../index.vue')
  }
]

export default routes
