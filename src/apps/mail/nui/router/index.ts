import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/mail',
    name: 'mail',
    component: () => import('../index.vue')
  }
]

export default routes
