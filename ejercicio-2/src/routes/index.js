import { createRouter, createWebHistory } from 'vue-router';

const requireAuth = () => {
  if (!localStorage.getItem('my-token')) {
    return '/login';
  }
};
//{ path: '/editar/:id', component: EditPoke, beforeEnter: requireAuth }
const routes = [
    
];


export const router = createRouter({
  history: createWebHistory(),
  routes
});