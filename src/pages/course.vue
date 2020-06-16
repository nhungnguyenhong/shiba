<template>
<div>
   
  <navbar></navbar>
   <div class="classroom" style="min-height: 500px" v-if="courses">
       <div class="container">
        <div
          class="classroom-list col-md-4"
          v-for="course in courses"
          v-bind:key="course.id"
        >
          <div class="card">
            <div class="classroom-background">
              <img :src="course.image" class="img-responsive">
            </div>
            <div class="classroom-list-head">
              <h3>
                <router-link :to="{path: '/classroom',query: { id: course.id }}">{{ course.name }}</router-link>
              </h3>
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
import moment from "moment";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
import VueAxios from "vue-axios";
import axios from "axios";

export default {
  name: "course",
  created() {
    this.idSubject = this.$route.query.id;
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/search?page=0&size=7&subjectId=" +
          vm.idSubject
      )
      .then(function(respone) {
        vm.courses = respone.data.data.content;
        console.log(vm.courses)
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  },
  data() {
    return {
     courses: {},
     idSubject: '',
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
.class-header {
    background-image: linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3))
}
</style>