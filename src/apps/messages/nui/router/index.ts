import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/messages',
    component: () => import('../index.vue'),
    meta: { noCorePadding: true },
    children: [
      {
        path: '',
        name: 'messages-list',
        component: () => import('../pages/ChatList.vue'),
        meta: { transition: 'fade', showBottomNav: true }
      },
      {
        path: 'updates',
        name: 'messages-updates',
        component: () => import('../pages/Updates.vue'),
        meta: { transition: 'fade', showBottomNav: true }
      },
      {
        path: 'calls',
        name: 'messages-calls',
        component: () => import('../pages/Calls.vue'),
        meta: { transition: 'fade', showBottomNav: true }
      },
      {
        path: 'communities',
        name: 'messages-communities',
        component: () => import('../pages/Communities.vue'),
        meta: { transition: 'fade', showBottomNav: true }
      },
      {
        path: 'archived',
        name: 'messages-archived',
        component: () => import('../pages/ArchivedList.vue'),
        meta: { transition: 'slide-left', showBottomNav: false }
      },
      {
        path: ':chatId',
        name: 'messages-chat',
        component: () => import('../pages/ChatView.vue'),
        meta: { transition: 'slide-left', showBottomNav: false }
      },
      {
        path: ':chatId/info',
        name: 'messages-contact-info',
        component: () => import('../pages/ContactInfo.vue'),
        meta: { transition: 'slide-left', showBottomNav: true }
      },
      {
        path: 'settings',
        name: 'messages-settings',
        component: () => import('../pages/Settings.vue'),
        meta: { transition: 'fade', showBottomNav: true }
      }
    ]
  }
]

export default routes
