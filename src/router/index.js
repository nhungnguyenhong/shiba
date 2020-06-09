import Vue from 'vue';
import Router from 'vue-router';

// import DashBoard from '@/components/dashboard/DashBoard';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Homepage from '../pages/Homepage';
import Register from '../pages/Register';
import Classroom from '../pages/Classroom';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use (VueAxios, axios);

Vue.use (Router);

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      exact: true,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
      exact: true,
    },
    {
      path: '/logout',
      name: Logout,
      component: Logout,
      exact: true,
    },
    {
      path: '/register',
      name: Register,
      component: Register,
      exact: true,
    },
    {
      path: '/classroom',
      name: Classroom,
      component: Classroom,
      exact: true,
    },
  ],
});
