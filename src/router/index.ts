import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../components/CryptoList.vue'),
    },
    {
      path: '/coin/:id',
      name: 'crypto-detail',
      component: () => import('../components/CryptoDetail.vue') // Ajusta el path
    },
    {
      path: '/error-page',
      name: 'error-page',
      component: () => import('../components/ErrorPage.vue') // Ajusta el path
    }
  ],
})

export default router
