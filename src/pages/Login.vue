<template>
  <div id="login-page">
    <div class="container">
      <div class="login-form col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
        <img src="../assets/images/logo-full.svg" class="login-logo" height="100px">
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <input type="text" class="form-control" id="username" required v-model="form.userName">
            <label for="username">Username</label>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              required
              v-model="form.password"
            >
            <label for="username">Password</label>
            <span class="login-error" v-if="login_error">
              <span class="glyphicon glyphicon-alert"></span> The username or password is incorrect.
            </span>
          </div>
          <div class="text-center" v-if="loading">
            <spinner></spinner>
            <span class="loading-msg">Logging in...</span>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-default">Login</button>
            <router-link :to="'/register'">Register</router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="object">
      <div class="overlay-bg"></div>
      <div class="star-1">
        <img src="../assets/images/login/star_Ly4.png" class="img-responsive">
      </div>
      <div class="star-2">
        <img src="../assets/images/login/star2_Ly4.png" class="img-responsive">
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m5_ly1.png" class="img-responsive">
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m4_ly1.png" class="img-responsive">
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m3_ly1.png" class="img-responsive">
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m2_ly1.png" class="img-responsive">
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m1_ly1.png" class="img-responsive">
      </div>
      <div class="cloud cloud-1">
        <img src="../assets/images/login/cloud1_ly2.png" class="img-responsive">
      </div>
      <div class="cloud cloud-2">
        <img src="../assets/images/login/cloud2_ly2.png" class="img-responsive">
      </div>
      <div class="cloud cloud-3">
        <img src="../assets/images/login/cloud3_ly2.png" class="img-responsive">
      </div>
      <div class="cloud cloud-4">
        <img src="../assets/images/login/cloud4_ly2.png" class="img-responsive">
      </div>
    </div>
  </div>
</template>

<script>
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);
import spinner from "./elements/spinner.vue";
import Vue from "vue";
import VueSession from "vue-session";
import VueToast from "vue-toast-notification";
import Swal from "sweetalert2";
Vue.use(VueSession);

export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      login_error: "",
      loading: false
    };
  },
  components: {
    spinner
  },
  methods: {
    login() {
      const vm = this;
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/login",
          this.form
        )
        .then(function(respone) {
          if (respone.data.status === "FAIL") {
            Swal.fire("Oops...", "The username or password is incorrect", "error");
          } else {
            vm.$session.start();
            vm.$session.set('checkLogin', true);
            vm.$session.set('user', vm.form.userName);
            Swal.fire("Success", "Wellcome to Shiba Learning!", "success");
            vm.$router.push({
              name: "homepage",
              params: { userName: vm.form.userName }
            });
          }
        });
    }
  },
  created() {
    if (this.$session.get('checkLogin') === true) {
      this.$router.push('/homepage');
    }
  }
};
</script>
