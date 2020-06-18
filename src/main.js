// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import './../node_modules/bulma/css/bulma.css';
import './../node_modules/vue-toast-notification/dist/index.css';
import './../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>',
});

