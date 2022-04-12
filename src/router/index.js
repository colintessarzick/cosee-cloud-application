import { createRouter, createWebHistory } from 'vue-router';

import Gallery from '../views/Gallery.vue';
import UploadPage from '../views/UploadPage.vue';
import ImagePage from '../views/ImagePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Gallery,
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
