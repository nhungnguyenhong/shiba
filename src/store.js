import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    user: {
      role: {},
    },
  },
  mutations: {
    storeUser (state, data) {
      state.user = data;
      state.isLoggedIn = true;
    },
    getPersonal (state, data) {
      state.user = data;
    },
    removePersonal (state) {
      state.user = {
        role: {},
      };
      state.isLoggedIn = false;
    },
  },
  getters: {
    getUserId: state => {
      return state.user.id;
    },
    getUser: state => {
      return state.user;
    },
    getRole: state => {
      return state.user.role.actions;
    },
    isTeacher: state => {
      return state.user.role.actions == 'is_teacher';
    },
    isStudent: state => {
      return state.user.role.actions == 'is_student';
    },
    getName: state => {
      return state.user.name;
    },
  },
  actions: {
    getPersonal({commit, state}) {
      const username = this.$session.get ('user');
      if (state.isLoggedIn) {
        axios
          .get (
            'http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=' +
              username
          )
          .then (response => {
            commit ('getPersonal', response.data);
          });
      }
    },
  },
});
