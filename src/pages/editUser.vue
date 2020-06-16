<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <form class="card" v-on:submit.prevent="update">
        <div
          class="profile-picture profile-picture-large"
          v-bind:style="{'background-image': `url(${getAvatar()})`}"
        >
          <upload-avatar v-on:uploaded="uploadComplete" :callback="'/api/avatar/upload'"></upload-avatar>
        </div>
        <div class="form-group col-md-12">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name">
        </div>
        <div class="form-group">
          <div class="col-md-6">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
              v-model="form.userName"
            >

            <p class="text-danger" v-for="error in form_errors.username" :key="error.id">
              <span v-if="form_errors.username">{{ error }}</span>
            </p>
          </div>
          <div class="col-md-6">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model="form.email"
            >
            <p class="text-danger" v-for="error in form_errors.email" :key="error.id">
              <span v-if="form_errors.email">{{ error }}</span>
            </p>
          </div>
        </div>
        <div class="form-group col-md-12">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="form.role.role_id">
            <option v-for="role in roles" :key="role.id" v-bind:value="role_id">{{ role.name }}</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-on:input="checkPassword"
            v-model="form.password"
          >
          <p class="text-danger" v-for="error in form_errors.password" :key="error.id">
            <span v-if="form_errors.password">{{ error }}</span>
          </p>
        </div>
        <div class="form-group col-md-12">
          <label for="password_confirmation">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="password_confirmation"
            placeholder="Confirm password"
            v-on:input="checkPassword"
            v-model="form.password_confirmation"
          >
        </div>
        <button class="btn btn-yel pull-right" type="submit" value="Submit">Submit</button>
        <div class="clearfix"></div>
      </form>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueAxios from "vue-axios";
import axios from "axios";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";

export default {
  data() {
    return {
      form: {
        avatar: "",
        name: "",
        userName: "",
        email: "",
        role_id: 2,
        password: "",
        password_confirmation: ""
      },
      form_errors: {},
      avatar_url: "",
      roles: [
        { id: 0, name: "admin" },
        { id: 1, name: "student" },
        { id: 2, name: "teacher" }
      ],
      swal_config: {
        title: "Complete",
        text: "Update user account complete!",
        type: "success",
        confirmButtonColor: "#3085d6"
      },
      user_name: this.$route.query.name
    };
  },
  components: {
    navbar,
    footerComponent
  },
  created() {
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +
          vm.user_name
      )
      .then(function(respone) {
        vm.form = respone.data.data;
      });
  },
  methods: {
    checkPassword() {
      if (this.form.password !== this.form.password_confirmation) {
        this.form_errors["password"] = [
          "The password confirmation does not match."
        ];
      } else {
        delete this.form_errors["password"];
      }
    },
    update() {
      if (this.form.avatar == this.avatar) {
        this.form.avatar = "";
      }
      axios
        .patch(`api/user/${this.user_id}`, this.form, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          swal(this.swal_config).then(() => {
            this.$router.push("/");
          });
        })
        .catch(error => {
          this.form_errors = error.response.data.errors;
        });
    },
    uploadComplete(url) {
      this.form.avatar = url;
    },
    getAvatar() {
      if (this.form.avatar) {
        return this.form.avatar;
      } else {
        return `../assets/images/avatar.svg`;
      }
    }
  }
};
</script>