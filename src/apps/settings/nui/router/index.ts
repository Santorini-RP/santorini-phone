import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/settings',
    name: 'settings',
    component: () => import('../index.vue'),
    meta: { transition: 'slide-right', appId: 'settings', noCorePadding: true }
  },
  {
    path: '/app/settings/display',
    name: 'settings-display',
    component: () => import('../components/DisplaySettings.vue'),
    meta: { transition: 'slide-left', appId: 'settings', noCorePadding: true }
  }
]

export default routes
