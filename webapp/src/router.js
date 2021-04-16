import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/Dashboard.vue'),
    },
    {
      path: '/user/new',
      name: 'Add new student',
      component: () => import('./components/CreateUser'),
    },
    {
      path: '/user',
      name: 'Users',
      component: () => import('./components/Users'),
    },
  ],
});

//adapted from https://www.freecodecamp.org/news/how-to-use-routing-in-vue-js-to-create-a-better-user-experience-98d225bbcdd9/
