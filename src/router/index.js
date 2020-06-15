import Vue from 'vue';
import Router from 'vue-router';

// import DashBoard from '@/components/dashboard/DashBoard';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Homepage from '../pages/Homepage';
import Register from '../pages/Register';
import classroom from '../pages/Classroom';
import Profile from '../pages/Profile';
import Grade from '../pages/Grade';
import Intro from '../pages/Intro';
import Subject from '../pages/Subject';
import Student from '../pages/Student';
import createUser from '../pages/createUser';
import editUser from '../pages/editUser';
import About from '../pages/About';
import lesson from '../pages/lesson';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use (VueAxios, axios);

Vue.use (Router);

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
      exact: true,
    },
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
      name: classroom,
      component: classroom,
      exact: true,
    },
    {
      path: '/profile',
      name: Profile,
      component: Profile,
      exact: true,
    },
    {
      path: '/about',
      name: About,
      component: About,
      exact: true,
    },
    {
      path: '/grade',
      name: Grade,
      component: Grade,
      exact: true,
    },
    {
      path: '/subject',
      name: Subject,
      component: Subject,
      exact: true,
    },
    {
      path: '/student',
      name: Student,
      component: Student,
      exact: true,
    },
    {
      path: '/createUser',
      name: createUser,
      component: createUser,
      exact: true,
    },
    {
      path: '/editUser',
      name: editUser,
      component: editUser,
      exact: true,
    },
    {
      path: '/lesson',
      name: lesson,
      component: lesson,
      exact: true,
    }
  ],
});
