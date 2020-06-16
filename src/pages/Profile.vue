<template>
  <div>
    <navbar></navbar>
    <div class="container" v-if="profile">
      <div class="card">
        <div class="profile">
          <!-- profile-picture -->
          <div class="container">
            <div class="row">
              <div class="profile-container col col-md-4 col-sm-4 col-xs-4">
                <div
                  class="profile-picture profile-picture-large"
                  v-bind:style="{'background-image': `url(${profile.avatar})`}"
                ></div>
                <div class="upload">
                  <input
                    type="file"
                    id="avatar"
                    ref="file"
                    class="form-control"
                    required
                    v-on:change="handleFileUpload()"
                  >
                </div>
              </div>
              <!-- profile-header -->
              <div class="profile-header col col-md-8 col-sm-8 col-xs-4" v-if="editable">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" v-model="profile.userName">
                </div>
                <!-- <p class="text-danger"
                                v-for="error in profile_errors.name"
                                v-if="profile_errors.name"
                >{{ error }}</p>-->
                <h4>Basic infomation</h4>
                <div class="form-group">
                  <label for="username">Username:</label>
                  <input type="text" v-model="profile.userName">
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="text" v-model="profile.email">
                </div>
                <button class="btn btn-default" @click="ToggleEnableEdit" v-if="editable">Cancel</button>
                <button class="btn btn-default" @click="changeProfile" v-if="editable">Update</button>
              </div>

              <div class="profile-header col col-md-8 col-sm-8 col-xs-8" v-else>
                <h3>{{ profile.userName }}</h3>
                <!-- <p>
                  <kbd>{{ profile.role.name }}</kbd>
                </p>-->
                <h3>Basic infomation</h3>
                <p>
                  <span style="font-weight: bold">Username:</span>
                  {{ profile.userName }}
                </p>
                <!-- <p class="text-danger"
                                    v-for="error in profile_errors.username"
                                    v-if="profile_errors.username"
                >{{ error }}</p>-->

                <p>
                  <span style="font-weight: bold">Email:</span>
                  {{ profile.email }}
                </p>
                <!-- <p class="text-danger"
                                    v-for="error in profile_errors.email"
                                    v-if="profile_errors.email"
                >{{ error }}</p>-->
                <button class="btn btn-default" @click="ToggleEnableEdit" v-if="!editable">Edit</button>

                <div class="profile-info" v-if="!editable">
                  <!-- security -->
                  <h4>Security</h4>
                  <p>
                    <span style="font-weight: bold">Password:</span>
                    <span style="font-weight: ">●●●●●●●●</span>
                  </p>
                  <button class="btn btn-default" @click="ToggleChangePass">Change password</button>
                  <div class="inner-profile-info" v-if="changePass">
                    <form
                      class="form-horizontal form-passchange"
                      v-on:submit.prevent="changePassword"
                    >
                      <div class="form-group">
                        <label for="password" class="col-sm-2 control-label">Old password</label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Old password"
                            v-model="security.password"
                          >
                        </div>
                        <!-- <p class="text-danger" v-for="error in security_errors.password" v-if="security_errors.password">{{ error }}</p> -->
                      </div>
                      <div class="form-group">
                        <label for="newpassword" class="col-sm-2 control-label">New password</label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="newpassword"
                            placeholder="New password"
                            v-model="security.new_password"
                          >
                        </div>
                        <!-- <p class="text-danger" v-for="error in security_errors.new_password" v-if="security_errors.new_password">{{ error }}</p> -->
                      </div>
                      <div class="form-group">
                        <label
                          for="newpassword_confirmation"
                          class="col-sm-2 control-label"
                        >Confirm new password</label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="newpassword_confirmation"
                            placeholder="Confirm new password"
                            v-model="security.new_password_confirmation"
                          >
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-default">Confirm change password</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spinner" v-else>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapGetters } from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
import store from "../store.js";

export default {
  data() {
    return {
      profile: {},
      username: "",
      security: {
        password: "",
        new_password: "",
        new_password_confirmation: ""
      },
      showUpload: false,
      security_errors: {},
      profile_errors: {},
      editable: false,
      changePass: false,
      swal_config: {
        title: "Complete",
        text: "Update complete!",
        type: "success",
        confirmButtonColor: "#3085d6"
      }
    };
  },
  created() {
    this.getData();
  },
  components: {
    navbar,
    footerComponent
  },
  methods: {
    handleFileUpload() {
      this.profile.newAvatar = this.$refs.file.files[0];
      // console.log(this.$refs.file.files[0]);
    },
    ToggleShowUpload() {
      this.showUpload = !this.showUpload;
    },
    ToggleEnableEdit() {
      this.editable = !this.editable;
      this.changePass = false;
      // this.profile = Object.assign({}, this.getUser);
    },
    ToggleChangePass() {
      this.changePass = !this.changePass;
      this.editable = false;
    },
    getData() {
      this.username = this.$session.get("user");
      const vm = this;
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +
            this.username
        )
        .then(function(respone) {
          vm.profile = respone.data.data;
        });
    },
    changePassword() {
      var data = {
        userName: this.profile.userName,
        password: this.security.password,
        newPassword: this.security.new_password
      };
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/change-password",
          data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          swal.fire("Success", response.data.description, "success");
        })
        .catch(error => {
          this.security_errors = "error";
        });
    },
    changeProfile() {
      const vm = this;
      const formData = new FormData();
      formData.append("userName", this.profile.userName); // lẩy ra userName của user hiện tại trên phiên hiện tại
      formData.append("newEmail", this.profile.email);
      formData.append("newAvatar", this.profile.newAvatar);
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
        .then(function(respone) {
          swal.fire("Success", "Update Success", "success");
          vm.$router.push('/homepage');
        })
        .catch(function() {
          swal.fire("Oops...", "Update fail", "error");
        });
    }
  }
};
</script>
<style>
.upload {
  width: 70%;
  margin-top: 10%;
}
</style>
