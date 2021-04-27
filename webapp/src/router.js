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
    /* User */
    {
      /* User Index */
      path: '/user',
      name: 'Users',
      component: () => import('./components/User/Index.vue'),
    },
    {
      /* User Create */
      path: '/user/new',
      name: 'Add new student',
      component: () => import('./components/User/Create.vue'),
    },
    {
      /* User View */
      path: '/user/:id/view',
      name: 'View a student',
      component: () => import('./components/User/View.vue'),
    },
    {
      /* User Edit */
      path: '/user/:id/edit',
      name: 'Edit a student',
      component: () => import('./components/User/Edit.vue'),
    },
    /* Group */
    {
      /* Group Index */
      path: '/group',
      name: 'Group',
      component: () => import('./components/Group/Index.vue'),
    },
    {
      /* Group Create */
      path: '/group/new',
      name: 'Add new group',
      component: () => import('./components/Group/Create.vue'),
    },
    {
      /* Group View */
      path: '/group/:id/view',
      name: 'View a group',
      component: () => import('./components/Group/View.vue'),
    },
    {
      /* Group Edit */
      path: '/group/:id/edit',
      name: 'Edit a group',
      component: () => import('./components/Group/Edit.vue'),
    },
  ],
});

//adapted from https://www.freecodecamp.org/news/how-to-use-routing-in-vue-js-to-create-a-better-user-experience-98d225bbcdd9/
