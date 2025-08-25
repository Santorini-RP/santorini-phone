import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/notes',
    name: 'notes',
    component: () => import('../index.vue')
  }
]

export default routes
