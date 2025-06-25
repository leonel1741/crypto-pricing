import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../views/CryptoList.vue'),
    },
    {
      path: '/coin/:id',
      name: 'crypto-detail',
      component: () => import('../views/CryptoDetail.vue')
    }
  ],
})

export default router
