import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app/contacts',
    name: 'contacts',
    component: () => import('../index.vue'),
    meta: { noCorePadding: true }
  }
];

export default routes;
