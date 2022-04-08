import { createRouter, createWebHistory } from 'vue-router'
import Grid from '../views/Grid.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Grid
    }
  ]
})

export default router
