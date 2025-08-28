import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/clock',
    name: 'clock',
    component: () => import('../index.vue')
  },
  {
    path: '/app/clock/new-alarm',
    name: 'clock-new-alarm',
    component: () => import('../pages/NewAlarm.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/app/clock/edit-alarm/:alarmId',
    name: 'clock-edit-alarm',
    component: () => import('../pages/EditAlarm.vue'),
    props: true,
    meta: { transition: 'slide-left' }
  }
]

export default routes
