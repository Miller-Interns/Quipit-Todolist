import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/home-view.vue';
import TodoPage from '../views/todo-view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoPage,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});

export default router;
