<template>
<div>
  <div id="login-page">
    <div class="container">
      <div class="login-form col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
        <img src="../assets/images/logo-full.svg" class="login-logo" height="80px">
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <input type="text" class="form-control" id="username" required v-model="form.username">
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
            </div>
            <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password_confirm"
              required
              v-model="form.password_confirm"
            >
             <label for="username">Confirm Password</label>
             <span class="register-error" v-if="register_error">
              <span class="glyphicon glyphicon-alert"></span> The confirm password and password is incorrect.
            </span>
            </div>
            <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="email"
              required
              v-model="form.email"
            >
            <label for="username">Email</label>
          </div>
          <div class="text-center" v-if="loading">
            <spinner></spinner>
            <span class="loading-msg">pendding...</span>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-default">Register</button>
            <button type="button" class="btn btn-default"><router-link :to="'/login'">Back to Login</router-link></button>
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
  </div>
</template>

<script>
import spinner from "./elements/spinner.vue";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        password_confirm: "",
        email: ""
      },
      register_error: false,
      loading: false,
    };
  },
  components: {
    spinner
  },
  methods: {
    register() {
      this.loading = true
      if(this.form.password !== this.form.password_confirm ){
        this.loading = false
        this.register_error = true
      } else {
        this.loading = false
        this.$router.push("/login");
      }
    },
  }
};
</script>
