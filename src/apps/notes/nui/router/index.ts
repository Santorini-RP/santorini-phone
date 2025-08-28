import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/notes',
    component: () => import('../index.vue'),
    meta: { noCorePadding: true },
    children: [
      {
        path: '',
        name: 'notes-list',
        component: () => import('../pages/NoteList.vue'),
        meta: { transition: 'fade' }
      },
      {
        path: 'new',
        name: 'notes-new',
        component: () => import('../pages/NewNote.vue'),
        meta: { transition: 'slide-left' }
      },
      {
        path: ':noteId',
        name: 'notes-detail',
        component: () => import('../pages/NoteDetail.vue'),
        props: true,
        meta: { transition: 'slide-left' }
      }
    ]
  }
]

export default routes
