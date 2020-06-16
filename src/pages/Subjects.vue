<template>
  <div>
    <navbar></navbar>
    <div class="box-search">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              class="form-control"
              v-on:keyup="Search()"
              v-model="textSearch"
              placeholder="Search subject by name"
            />
          </div>
        </div>
    <div class="classroom" style="min-height: 500px" v-if="subjects">
      <div class="container">
        <div class="classroom-list col-md-4" v-for="subject in subjects" v-bind:key="subject.id">
          <div class="card">
            <div class="classroom-background">
              <img :src="subject.image" class="img-responsive">
            </div>
            <div class="classroom-list-head">
              <h3>
                <router-link :to="{path: '/course',query: { id: subject.id }}">{{ subject.name }}</router-link>
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
    <div class="text-center">
          <Pagination
            :page-count="totalPages"
            :page-range="3"
            :margin-pages="2"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :click-handler="changePage"
            :container-class="'pagination'"
          ></Pagination>
        </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import Pagination from "vuejs-paginate";

Vue.use(Pagination);
export default {
  name: "Subjects",
  created() {
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/search?page=0&size=6"
      )
      .then(function(response) {
        vm.subjects = response.data.data.content;
        vm.totalPages = response.data.data.totalPages;
        // console.log(vm.subjects);
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  },
  data() {
    return {
      subjects: [],
      totalPages: 0,
      textSearch: "",
      pageNumber: 0,
    };
  },
  components: {
    navbar: navbar,
    footerComponent,
    Pagination
  },
  methods: {
      Search() {
      const vm = this;
    //   console.log("vm.pageNumber: "+vm.pageNumber);
      axios
        .get(
         "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/search?page="
            +vm.pageNumber 
            +"&size=6&name="
            +vm.textSearch
        )
        .then(function(response) {
          vm.subjects = response.data.data.content;
          vm.totalPages = response.data.data.totalPages;
          vm.pageNumber = response.data.data.number;
          // console.log("respone.data.data: "+respone.data.data.totalElements);
        });
    },
      changePage(pageNum) {
      if (pageNum === undefined) {
        this.pageNumber = 0;
      }
      this.pageNumber = pageNum - 1;
      this.Search();
    }
  }
};
</script>
<style>
.class-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>