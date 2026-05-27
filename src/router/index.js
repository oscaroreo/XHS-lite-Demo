import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail/index.vue'),
  },
  {
    path: '/regret-sim',
    name: 'RegretSim',
    component: () => import('@/views/RegretSim/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router