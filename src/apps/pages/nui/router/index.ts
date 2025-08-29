import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app/pages',
    name: 'pages',
    component: () => import('../index.vue'),
  },
  {
    path: '/app/pages/new',
    name: 'pages-new',
    component: () => import('../pages/NewPost.vue'),
    meta: { transition: 'slide-up' }
  },
];

export default routes;
