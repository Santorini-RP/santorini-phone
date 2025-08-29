import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app/marketplace',
    component: () => import('../index.vue'),
    redirect: '/app/marketplace/home',
    children: [
      {
        path: 'home',
        name: 'marketplace-home',
        component: () => import('../pages/Home.vue'),
      },
      {
        path: 'posts',
        name: 'marketplace-posts',
        component: () => import('../pages/YourPosts.vue'),
      },
      {
        path: 'new',
        name: 'marketplace-new',
        component: () => import('../pages/NewPost.vue'),
        meta: { transition: 'slide-up' }
      },
      {
        path: ':listingId',
        name: 'marketplace-detail',
        component: () => import('../pages/ListingDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      },
    ],
  },
];

export default routes;
