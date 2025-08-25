import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/voicememo',
    name: 'voicememo',
    component: () => import('../index.vue')
  }
]

export default routes
