<template>
  <div>
    <navbar></navbar>
    <div id="classroom" style="min-height: 500px">
      <div class="page-header">
        <div class="container user-profile">
          <div>
            <div class="col-md-2 col-xs-4">
              <div class="profile-picture profile-picture-medium" v-if="!getUser.avatar">
                <img src="../assets/images/avatar.svg" class="img-responsive">
              </div>
              <div class="profile-picture profile-picture-medium">
                <img v-bind:src="getUser.avatar" class="img-responsive">
              </div>
            </div>
            <div class="col-md-10 col-xs-8 profile-detail">
              <div class="row">
                <div class="col-md-12 profile-info">
                  <div class="profile-name">
                    <router-link to="profile">
                      <p>{{ getUser.userName }}</p>
                    </router-link>
                  </div>
                  <span class="username">@{{ getUser.userName }}</span>
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
        <div
          class="classroom-list col-md-4"
          v-for="classroom in classrooms"
          v-bind:key="classroom.id"
        >
          <div class="card">
            <div class="classroom-background">
              <img src="../assets/images/classroom.svg" class="img-responsive">
            </div>
            <div class="classroom-list-head">
              <h3>
                <router-link :to="{path: '/classroom',query: { id: classroom.id }}">{{ classroom.name }}</router-link>
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
import VueAxios from "vue-axios";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapGetters } from "vuex";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
// import { constants } from 'http2';

export default {
  name: "homepage",
  created() {
    this.getName = this.$session.get('user');
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +this.getName
      )
      .then(function(respone) {
        vm.getUser = respone.data.data;
        if (vm.getUser.roleId === "1") {
          vm.isTeacher = true;
        } else {
          vm.isTeacher = false;
        }
          axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/search?page=0&size=10&&courseId=4&studentId="+ respone.data.data.id
      )
      .then(function(respone) {
        vm.classrooms = respone.data.data.content;
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  
  },
  data() {
    return {
      classrooms: "",
      status: false,
      getName: "",
      show_join: false,
      isTeacher: "",
      getUser: {}
    };
  },
  components: {
    navbar: navbar,
    footerComponent
  },
  methods: {
    showJoin() {
      var self = this;
      Swal.fire({
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
        if(code.dismiss !== 'cancel'){
        self.requestJoin(code);
        }
      });
    },
    requestJoin(code) {
      var data = {
        code: code
      };
      const vm = this;
      axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/get-by-id?id="+ code.value
      )
      .then(function(respone) {
        if( respone.data.status === 'SUCCESS'){
         vm.$router.push("classroom?id=" + code.value);
        } else {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        }
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
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
