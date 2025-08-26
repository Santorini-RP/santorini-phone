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
        meta: { transition: 'fade' }
      },
      {
        path: 'archived',
        name: 'messages-archived',
        component: () => import('../pages/ArchivedList.vue'),
        meta: { transition: 'slide-left' }
      },
      {
        path: ':chatId',
        name: 'messages-chat',
        component: () => import('../pages/ChatView.vue'),
        meta: { transition: 'slide-left' }
      }
    ]
  }
]

export default routes
