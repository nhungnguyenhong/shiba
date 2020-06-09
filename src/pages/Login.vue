<template>
  <div id="login-page">
    <div class="container">
      <div class="login-form col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
        <img src="../assets/images/logo-full.svg" class="login-logo" height="100px">
        <form v-on:submit.prevent="login">
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
        <!-- <img src="../assets/images/login/cloud1_ly2.png" class="img-responsive"> -->
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
import spinner from "./elements/spinner.vue";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      login_error: false,
      loading: false,
    };
  },
  components: {
    spinner
  },
  methods: {
    login() {
      this.loading = true
      if (
        (this.form.username === "shiba" ||
          this.form.username === "nhung4092") &&
        this.form.password === "123456"
      ) {
        this.loading = false
        this.$router.push("/homepage");
      } else {
        this.loading = false
        this.login_error = true
      }
    },
  }
};
</script>
