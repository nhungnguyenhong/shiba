<template>
  <div>
    <navbar></navbar>
<<<<<<< HEAD
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
=======
    <div class="box-search">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              class="form-control"
              v-on:keyup="Search()"
              v-model="textSearch"
              placeholder="Search course by name"
            />
          </div>
        </div>
    <div class="classroom" style="min-height: 500px" v-if="courses">
      <div class="container">
        <div class="classroom-list col-md-4" v-for="course in courses" v-bind:key="course.id">
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
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
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
        // console.log(vm.courses);
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  },
  data() {
    return {
      courses: [],
<<<<<<< HEAD
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
=======
      totalPages: 0,
      textSearch: "",
      pageNumber: 0,
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
    };
  },
  components: {
    navbar: navbar,
    footerComponent,
    Pagination
  },
  methods: {
<<<<<<< HEAD
    Search() {
      const vm = this;
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/search?page=" +
            vm.pageNumber +
            "&size=6&name=" +
            vm.textSearch
=======
      Search() {
      const vm = this;
    //   console.log("vm.pageNumber: "+vm.pageNumber);
      axios
        .get(
         "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/search?page="
            +vm.pageNumber 
            +"&size=6&name="
            +vm.textSearch
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
        )
        .then(function(response) {
          vm.courses = response.data.data.content;
          vm.totalPages = response.data.data.totalPages;
<<<<<<< HEAD
        });
    },
    changePage(pageNum) {
=======
          // console.log("respone.data.data: "+respone.data.data.totalElements);
        });
    },
      changePage(pageNum) {
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
      if (pageNum === undefined) {
        this.pageNumber = 0;
      }
      this.pageNumber = pageNum - 1;
      this.Search();
<<<<<<< HEAD
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
=======
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
    }
  }
};
</script>
<style>
<<<<<<< HEAD
.wid-100 {
  width: 100%;
}

.container-post {
  width: 270px;
}

.container-post-content {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 70%;
}

.class-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  /* background-image: url('../assets/images/bg.jpeg'); */
}

.text-align-center {
  text-align: center;
}

.class-titile {
  font-weight: bold;
}

.class-description {
  font-size: 34px;
  font-style: italic;
}

.footer {
  position: relative !important;
}

.margin-button {
  margin: 22px 94px 0 94px;
  position: relative;
}

.button-let-go {
  width: 100px;
  height: 50px;
}

.button-let-go > a {
  color: inherit;
  font-size: 18px;
}

.button-let-go > a:hover {
  text-decoration: none;
}

.has-search .form-control {
  padding-left: 2.375rem;
  margin-top: 26px;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 64rem;
  height: 2.375rem;
  line-height: 7.475rem;
  text-align: center;
  margin-top: 4.8%;
  pointer-events: none;
  color: #aaa;
  padding-right: 20px;
}

.box-search {
  width: 50%;
  margin: 0px auto;
  position: relative;
}
.add-lesson {
  position: absolute;
  top: 0;
  right: -160px;
}
.padding-30 {
  padding: 30px;
}
.red {
  color: red;
}
.button-delete {
  position: absolute;
  top: 0;
  left: 137px;
  width: 100px;
  height: 50px;
  font-size: 18px;
=======
.class-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
>>>>>>> 1520b8824a3463244fac574500754d9a0fd620e1
}
</style>