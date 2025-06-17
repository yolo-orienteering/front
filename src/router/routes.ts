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
        name: 'my-races',
        path: 'my/races',
        component: () => import('pages/races/MyRaces.vue'),
        props: true
      },
      {
        name: 'race',
        path: 'race/:id',
        component: () => import('pages/races/Race.vue'),
        props: true
      },
      {
        name: 'privacy-policy',
        path: 'privacy-policy',
        component: () => import('pages/PrivacyPolicy.vue'),
        props: true
      },
      {
        name: 'departures-by-category',
        path: 'race/:raceId/departures/cateogry/:raceCategoryId',
        component: () => import('pages/departures/DeparturesByCategory.vue'),
        props: true
      },
      {
        name: 'roadmap',
        path: '/roadmap',
        component: () => import('pages/Roadmap.vue'),
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
