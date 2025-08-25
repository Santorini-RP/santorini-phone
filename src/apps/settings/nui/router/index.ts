import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/settings',
    component: () => import('../index.vue'),
    meta: { 
      appId: 'settings', 
      noCorePadding: true,
      title: 'Settings' 
    },
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('../pages/Home.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'display',
        name: 'settings-display',
        component: () => import('../pages/Display.vue'),
        meta: { transition: 'slide-left', title: 'Display & Brightness' }
      },
      {
        path: 'notifications',
        name: 'settings-notifications',
        component: () => import('../pages/Notifications.vue'),
        meta: { transition: 'slide-left', title: 'Notifications' }
      },
      {
        path: 'notifications/:appId',
        name: 'settings-notifications-app',
        component: () => import('../pages/NotificationsApp.vue'),
        props: true,
        meta: { transition: 'slide-left', title: 'App Notifications' } // Title can be set dynamically in component
      }
    ]
  }
]

export default routes
