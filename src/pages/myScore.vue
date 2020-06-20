<template>
  <div>
    <navbar></navbar>
    <div id="classroom" style="min-height: 500px">
      <div class="page-header">
        <div class="container user-profile">
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
      <div class="container">
        <h2 style="text-align:center">Personal scoreboard</h2>
        <table class="table member-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Point</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr v-for="(point, key) in getPoint" :key="key">
            <th scope="row">{{ key+1 }}</th>
            <td>{{ point.course.name }}</td>
            <td>{{ point.course.subject.name }}</td>
            <td>{{ point.course.teacher.userName }}</td>
            <td>{{ point.point + 0}}/10</td>
            <td v-if="point.point < 5"><span class="tag is-danger">NOT PASS</span></td>
            <td v-else><span class="tag is-success">PASS</span></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="is-loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <footerComponent></footerComponent>
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
export default {
  name: "myScore",
  created() {
    this.getId = this.$session.get("id");
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/search?page=0&size=10&studentId=" +
          this.getId
      )
      .then(function(respone) {
        vm.getUser = respone.data.data.content[0].user;
        for (var i = 0; i < respone.data.data.content.length; i++) {
          vm.getPoint.push(respone.data.data.content[i]);
        }
      });
  },
  data() {
    return {
      classrooms: [],
      status: false,
      getId: "",
      show_join: false,
      isTeacher: "",
      getUser: {},
      getPoint: [],
      status: 0
    };
  },
  components: {
    navbar: navbar,
    footerComponent
  },
  methods: {
  }
};
</script>
<style>
</style>