import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: () => import('@/views/WeatherHomeView.vue'),
  },

  {
    path: '/weather',
    name: 'WeatherDetail',

    component: () => import('@/views/WeatherDetailView.vue'),
  },

  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('@/views/WeatherAboutView.vue'),
  },

  {
    path: '/tips',
    name: 'WeatherTips',
    component: () => import('@/views/WeatherTipsView.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
