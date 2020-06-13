<template>
  <div id="login-page">
    <div class="container">
      <div class="login-form col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
        <img src="../assets/images/logo-full.svg" class="login-logo" height="100px" />
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <input type="text" class="form-control" id="username" required v-model="form.username" />
            <label for="username">Username</label>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="email" required v-model="form.email" />
            <label for="username">new Email</label>
            <span class="login-error" v-if="login_error">
              <span class="glyphicon glyphicon-alert"></span> The username or password is incorrect.
            </span>
          </div>
          <div class="form-group">
            <input
              type="file"
              id="avatar"
              ref="file"
              class="form-control"
              required
              v-on:change="handleFileUpload()"
            />
            <label for="avatar">New Avatar</label>
          </div>
          <div class="text-center" v-if="loading">
            <spinner></spinner>
            <span class="loading-msg">Logging in...</span>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-default">Login</button>
            <button type="button" class="btn btn-default">
              <router-link :to="'/register'">Register</router-link>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="object">
      <div class="overlay-bg"></div>
      <div class="star-1">
        <img src="../assets/images/login/star_Ly4.png" class="img-responsive" />
      </div>
      <div class="star-2">
        <img src="../assets/images/login/star2_Ly4.png" class="img-responsive" />
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m5_ly1.png" class="img-responsive" />
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m4_ly1.png" class="img-responsive" />
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m3_ly1.png" class="img-responsive" />
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m2_ly1.png" class="img-responsive" />
      </div>
      <div class="mountain">
        <img src="../assets/images/login/m1_ly1.png" class="img-responsive" />
      </div>
      <div class="cloud cloud-1">
        <img src="../assets/images/login/cloud1_ly2.png" class="img-responsive" />
      </div>
      <div class="cloud cloud-2">
        <img src="../assets/images/login/cloud2_ly2.png" class="img-responsive" />
      </div>
      <div class="cloud cloud-3">
        <img src="../assets/images/login/cloud3_ly2.png" class="img-responsive" />
      </div>
      <div class="cloud cloud-4">
        <img src="../assets/images/login/cloud4_ly2.png" class="img-responsive" />
      </div>
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import spinner from "./elements/spinner.vue";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      login_error: false,
      loading: false
    };
  },
  components: {
    spinner
  },
  methods: {
    login() {
      // this.loading = true
      // if (
      //   (this.form.username === "shiba" ||
      //     this.form.username === "nhung4092") &&
      //   this.form.password === "123456"
      // ) {
      //   this.loading = false
      //   this.$router.push("/homepage");
      // } else {
      //   this.loading = false
      //   this.login_error = true
      // }
      const formData = new FormData();
      formData.append("userName", "zovivo1"); // lẩy ra userName của user hiện tại trên phiên hiện tại
      formData.append("newEmail", this.form.email);
      formData.append("newAvatar", this.form.avatar);
      for (var value of formData.values()) {
        console.log(value);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    // hàm handle thêm vào methods
    handleFileUpload() {
      this.form.avatar = this.$refs.file.files[0];
    }
  }
};
</script>
