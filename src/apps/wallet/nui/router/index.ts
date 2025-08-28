import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/wallet',
    name: 'wallet',
    component: () => import('../index.vue')
  },
  {
    path: '/app/wallet/transactions',
    name: 'wallet-transactions',
    component: () => import('../pages/AllTransactions.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/app/wallet/send',
    name: 'wallet-send',
    component: () => import('../pages/Send.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/app/wallet/send/amount',
    name: 'wallet-send-amount',
    component: () => import('../pages/Amount.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/app/wallet/send/confirmation',
    name: 'wallet-send-confirmation',
    component: () => import('../pages/Confirmation.vue'),
    meta: { transition: 'slide-left' }
  }
]

export default routes
