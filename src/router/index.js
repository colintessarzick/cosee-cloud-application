import { createRouter, createWebHistory } from 'vue-router';

import Grid from '../views/Grid.vue';
import UploadPage from '../views/UploadPage.vue';
import ImagePage from '../views/ImagePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Grid,
    },
    {
      path: '/upload',
      component: UploadPage,
    },
    {
      path: '/:id',
      component: ImagePage,
    },
  ],
});

export default router;
