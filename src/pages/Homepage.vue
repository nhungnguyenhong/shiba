<template>
  <div>
    <navbar></navbar>
    <div id="classroom" style="min-height: 500px">
      <div class="page-header">
        <div class="container user-profile">
          <div>
            <div class="col-md-2 col-xs-4">
              <div
                class="profile-picture profile-picture-medium"
              >
              <img src="../assets/images/about-us/dorn.jpg" class="img-responsive">
              </div>
            </div>
            <div class="col-md-10 col-xs-8 profile-detail">
              <div class="row">
                <div class="col-md-12 profile-info">
                  <div class="profile-name">
                    <router-link to="profile">
                      <p>{{ getUser.name }}</p>
                    </router-link>
                  </div>
                  <span class="username">@{{ getUser.username }}</span>
                </div>
              </div>
              <div class="row hidden-xs">
                <div class="col-xs-12">
                  <div class="profile-email">{{ getUser.email }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container page-title">
          <h1>Your Classroom</h1>
          <router-link to="classroom/create" class="btn btn-default" v-if="isTeacher">Create class</router-link>
          <button class="btn btn-default" @click="showJoin">Join class</button>
        </div>
      </div>
      <classroom-join v-if="show_join"></classroom-join>
      <div class="container">
        <div class="classroom-list col-md-4" v-for="classroom in classrooms" v-bind:key="classroom">
          <div class="card">
            <div
              class="classroom-background"
            >
             <img src="../assets/images/math.png" class="img-responsive">
            </div>
            <div class="classroom-list-head">
              .
              <h3>
                <router-link :to="'/classroom/'+classroom.id">{{ classroom.name }}</router-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="is-loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>

      <footerComponent></footerComponent>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapGetters } from "vuex";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";

export default {
  data() {
    return {
      classrooms: "mat",
      status: false,
      show_join: false,
      isTeacher: true,
      getUser: {
        name: "Nguyễn Hồng Nhung",
        username: "nhung4092",
        email: "hongnhungnguyen4092@gmail.com"
      }
    };
  },
  components: {
    navbar: navbar,
    footerComponent
  },
  methods: {
    showJoin() {
      var self = this;
      swal({
        title: "Enter code to join class",
        input: "text",
        inputPlaceholder: "Enter code",
        customClass: "test",
        showCancelButton: true,
        inputValidator: function(value) {
          return new Promise(function(resolve, reject) {
            if (value) {
              resolve();
            } else {
              reject("Please enter the code.");
            }
          });
        }
      }).then(function(code) {
        self.requestJoin(code);
      });
    },
    requestJoin(code) {
      var token = this.$auth.getToken();
      var data = {
        code: code
      };
      axios
        .post("api/classroom/join", data, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          this.$router.push("classroom/" + response.data.classroom_id);
        });
    }
  }
};
</script>
<style>
.profile-picture-medium {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
