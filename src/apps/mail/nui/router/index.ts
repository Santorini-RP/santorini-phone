import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/mail',
    component: () => import('../index.vue'),
    children: [
      {
        path: '',
        name: 'mail-create-account',
        component: () => import('../pages/CreateAccount.vue'),
      },
      {
        path: 'login',
        name: 'mail-login',
        component: () => import('../pages/Login.vue'),
      },
      {
        path: 'inbox',
        name: 'mail-inbox',
        component: () => import('../pages/Inbox.vue'),
      },
      {
        path: 'inbox/:emailId',
        name: 'mail-detail',
        component: () => import('../pages/EmailDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      }
    ]
  }
]

export default routes
