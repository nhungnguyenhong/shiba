<template>
<div>
    <navbar></navbar>
  <div class="container">
    <form class="card" v-on:submit.prevent="create">
      <div
        class="profile-picture profile-picture-large"
        v-bind:style="{'background-image': `url(${getAvatar()})`}"
      >
        <upload-avatar v-on:uploaded="uploadComplete" :callback="'/api/avatar/upload'"></upload-avatar>
      </div>
      <div class="form-group">
        <div class="col-md-6">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name">
        </div>
        <div class="col-md-6">
          <label for="surname">Surname</label>
          <input
            type="text"
            class="form-control"
            id="surname"
            placeholder="Surname"
            v-model="form.surname"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-6">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            v-model="form.username"
          >
          <!-- <p class="text-danger"
                        v-for="error in form_errors.username"
                        v-if="form_errors.username"
          >{{ error }}</p>-->
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
          <!-- <p class="text-danger"
                        v-for="error in form_errors.email"
                        v-if="form_errors.email"
          >{{ error }}</p>-->
        </div>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select class="form-control" id="role" v-model="form.role_id">
          <option v-for="role in roles" :key="role.id" v-bind:value="role.id">{{ role.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-on:input="checkPassword"
          v-model="form.password"
        >
        <!-- <p class="text-danger"
                    v-for="error in form_errors.password"
                    v-if="form_errors.password"
        >{{ error }}</p>-->
      </div>
      <div class="form-group">
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
        avatar_url: "",
        name: "",
        surname: "",
        username: "",
        email: "",
        role_id: 2,
        password: "",
        password_confirmation: ""
      },
      form_errors: {},
      avatar_url: "",
      roles: [],
      swal_config: {
        title: "Complete",
        text: "Create new user account complete!",
        type: "success",
        confirmButtonColor: "#3085d6"
      },
    };
  },
  components: {
      navbar,
      footerComponent
  },
  created() {
    axios
      .get("api/role", {
        headers: {
          Authorization: "Bearer " + this.token
        }
      })
      .then(response => {
        this.roles = response.data;
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
    create() {
      axios
        .post("api/user", this.form, {
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
      this.form.avatar_url = url;
    },
    getAvatar() {
      if (this.form.avatar_url) {
        return this.form.avatar_url;
      } else {
        return `${this.baseUrl}/images/avatar.svg`;
      }
    }
  }
};
</script>