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
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue'),
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

    /* Assessment */
    {
      /* Assessment Index */
      path: '/assessment',
      name: 'Assessment',
      component: () => import('./components/Assessment/Index.vue'),
    },
    {
      /* Assessment Create */
      path: '/assessment/new',
      name: 'Add new assessment',
      component: () => import('./components/Assessment/Create.vue'),
    },
    {
      /* Assessment View */
      path: '/assessment/:id/view',
      name: 'View a assessment',
      component: () => import('./components/Assessment/View.vue'),
    },
    {
      /* Assessment Edit */
      path: '/assessment/:id/edit',
      name: 'Edit a assessment',
      component: () => import('./components/Assessment/Edit.vue'),
    },

    /* Response */
    {
      /* Response Index */
      path: '/response',
      name: 'Response',
      component: () => import('./components/Response/Index.vue'),
    },
    {
      /* Response Create */
      path: '/response/:id/new',
      name: 'Add new response',
      component: () => import('./components/Response/Create.vue'),
    },
    {
      /* Response View */
      path: '/response/:id/view',
      name: 'View a response',
      component: () => import('./components/Response/View.vue'),
    },
    {
      /* Response: Choose group to review */
      path: '/response/:id/',
      name: 'Choose a group to review',
      component: () => import('./components/Response/ChooseGroup.vue'),
    },
  ],
});

//adapted from https://www.freecodecamp.org/news/how-to-use-routing-in-vue-js-to-create-a-better-user-experience-98d225bbcdd9/
