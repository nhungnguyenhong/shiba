<template>
  <div>
    <navbar></navbar>
    <div class="classroom" style="min-height: 500px">
      <div class="box-search">
        <div class="form-group has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            class="form-control"
            v-on:keyup="Search()"
            v-model="textSearch"
            placeholder="Search by course name"
          />
        </div>
        <button
          v-if="getRole() === 'teacher' || getRole() === 'admin'"
          type="button"
          class="btn btn-success add-course"
          @click="showModalAdd()"
        >Create course</button>
      </div>
      <modal name="add-course" :height="550">
        <div>
          <form v-on:submit.prevent="submitFile" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">
                Course name(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="name" v-model="form.name" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Course description(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="description" v-model="form.description" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Teacher (
                <span class="red">*</span>)
              </label>
              <select class="form-control" id="teacher" v-model="form.teacherId">
                <option
                  v-for="teacher in form.teachers"
                  :key="teacher.id"
                  v-bind:value="teacher.id"
                >{{ teacher.userName }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Subject (
                <span class="red">*</span>)
              </label>
              <select class="form-control" id="subject" v-model="form.subjectId">
                <option
                  v-for="subject in form.subjects"
                  :key="subject.id"
                  v-bind:value="subject.id"
                >{{ subject.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Course image</label>
              <input
                type="file"
                class="form-control-file"
                ref="fileImage"
                id="fileImage"
                v-on:change="handleFileImageUpload()"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Course cover</label>
              <input
                type="file"
                class="form-control-file"
                ref="fileCover"
                id="fileCover"
                v-on:change="handleFileCoverUpload()"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>
      <div class="container" v-if="!courses">
        <div class="no-post">No course found</div>
      </div>
      <div class="container" v-else>
        <section class="container">
          <div class="columns features">
            <div class="card is-shady wid-100">
              <div class="class-posts card" v-for="course in courses" :key="course.id">
                <div class="card-image container-post">
                  <figure class="image is-4by3">
                    <img v-bind:src="course.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content container-post-content">
                  <div class="content">
                    <h4>{{course.name}}</h4>
                    <p></p>
                    <div class="buttons margin-button">
                      <button class="button is-success button-let-go">
                        <router-link :to="{path: '/classroom',query: { id: course.id }}">View</router-link>
                      </button>
                      <button
                        v-if="getRole() === 'admin' || deleteRole(course) === true"
                        type="button"
                        class="btn btn-danger button-delete"
                        @click="deleteCourse(course.id)"
                      >Delete</button>
                    </div>
                  </div>
                </div>
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
            </div>
          </div>
        </section>
      </div>
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
import VModal from "vue-js-modal";

Vue.use(Pagination);
Vue.use(VModal);

export default {
  name: "Courses",
  created() {
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/search?page=0&size=6"
      )
      .then(function(response) {
        vm.courses = response.data.data.content;
        vm.totalPages = response.data.data.totalPages;
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  },
  data() {
    return {
      courses: [],
      form: {
        name: "",
        description: "",
        teacherId: "",
        subjectId: "",
        teachers: [],
        subjects: []
      },
      swal_config: {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      },
      totalPages: 0,
      textSearch: "",
      pageNumber: 0
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
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/search?page=" +
            vm.pageNumber +
            "&size=6&name=" +
            vm.textSearch
        )
        .then(function(response) {
          vm.courses = response.data.data.content;
          vm.totalPages = response.data.data.totalPages;
        });
    },
    changePage(pageNum) {
      if (pageNum === undefined) {
        this.pageNumber = 0;
      }
      this.pageNumber = pageNum - 1;
      this.Search();
    },
    showModalAdd() {
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-all-teacher"
        )
        .then(response => {
          this.form.teachers = response.data.data;
          axios
            .get(
              "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/get-all-subject"
            )
            .then(response => {
              this.form.subjects = response.data.data;
              this.$modal.show("add-course");
            });
        });
    },
    getRole() {
      this.currentUser = this.$session.get("currentUser");
      return this.currentUser.role.roleName;
    },
    deleteRole(course) {
      const currentUser = this.$session.get("currentUser");
      return currentUser.id === course.teacher.id ? true : false;
    },
    hideModalAdd() {
      this.$modal.hide("add-course");
    },
    handleFileImageUpload() {
      this.fileImage = this.$refs.fileImage.files[0];
    },
    handleFileCoverUpload() {
      this.fileCover = this.$refs.fileCover.files[0];
    },
    submitFile() {
      let formData = new FormData();
      let vm = this;
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("teacherId", this.form.teacherId);
      formData.append("subjectId", this.form.subjectId);
      if (typeof this.fileImage !== "undefined") {
        formData.append("image", this.fileImage);
      }
      if (typeof this.fileCover !== "undefined") {
        formData.append("cover", this.fileCover);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
          vm.hideModalAdd();
          vm.Search();
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    deleteCourse(courseId) {
      const vm = this;

      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/delete-by-id",
                { id: courseId }
              )
              .then(function(respone) {
                vm.Search();
              });
          }
      });
    }
  }
};
</script>
<style>
</style>