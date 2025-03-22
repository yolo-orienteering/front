import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        props: true
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('pages/Settings.vue'),
        props: true
      },
      {
        name: 'races',
        path: 'races',
        component: () => import('pages/races/Races.vue'),
        props: true
      },
      {
        name: 'race',
        path: 'race/:id',
        component: () => import('pages/races/Race.vue'),
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
