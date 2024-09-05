import { createRouter, createWebHistory } from 'vue-router';
import Gallery from '@/components/Gallery.vue';
import Mint from '@/components/Mint.vue';
import Transfer from '@/components/Transfer.vue';

const routes = [
  { path: '/', component: Gallery },
  { path: '/mint', component: Mint },
  { path: '/transfer', component: Transfer }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
