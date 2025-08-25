import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/instapic',
    name: 'instapic',
    component: () => import('../index.vue')
  }
]

export default routes
