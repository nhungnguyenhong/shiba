<template>
  <div>
    <navbar></navbar>
    <div class="classroom" style="min-height: 500px">
      <div class="box-search">
        <div class="form-group has-search">
          <!-- <span class="fa fa-search form-control-feedback"></span> -->
          <input
            type="text"
            class="form-control"
            v-on:keyup="Search()"
            v-model="textSearch"
            placeholder="Search by subject name"
          />
        </div>
        <button
          type="button"
          class="btn btn-success add-course"
          @click="showModalAdd()"
        >Create subject</button>
      </div>
      <modal name="create-subject" :height="400">
        <div>
          <form v-on:submit.prevent="submitCreate" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">
                Subject name(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="name" v-model="form.name" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Subject description(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="description" v-model="form.description" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Grade (
                <span class="red">*</span>)
              </label>
              <select class="form-control" id="grade" v-model="form.gradeId">
                <option
                  v-for="grade in form.grades"
                  :key="grade.id"
                  v-bind:value="grade.id"
                >{{ grade.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Subject image</label>
              <input
                type="file"
                class="form-control-file"
                ref="file"
                id="fileImage"
                v-on:change="handleFileImageUpload()"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>
      <modal name="edit-subject" :height="400">
        <div>
          <form v-on:submit.prevent="submitEdit" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">
                Subject name(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="name" v-model="formEdit.name" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Subject description(
                <span class="red">*</span>)
              </label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="formEdit.description"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Grade (
                <span class="red">*</span>)
              </label>
              <select class="form-control" id="grade" v-model="formEdit.gradeId">
                <option
                  v-for="grade in formEdit.grades"
                  :key="grade.id"
                  v-bind:value="grade.id"
                >{{ grade.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Subject image</label>
              <input
                type="file"
                class="form-control-file"
                ref="fileEdit"
                id="fileEditImage"
                v-on:change="handleEditImageUpload()"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>
      <div class="container" v-if="!subjects">
        <div class="no-post">No subject found</div>
      </div>
      <div class="container" v-else>
        <section class="container">
          <div class="columns features">
            <div class="card is-shady wid-100">
              <div class="class-posts card" v-for="subject in subjects" :key="subject.id">
                <div class="card-image container-post">
                  <figure class="image is-4by3">
                    <img v-bind:src="subject.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content container-post-content">
                  <div class="content">
                    <router-link :to="{path: '/course',query: { id: subject.id }}">{{subject.name}}</router-link>
                    <p></p>
                    <div class="buttons margin-button">
                      <button
                        class="btn btn-default"
                        style="margin: 4px 15px;"
                        @click="showModalEdit(subject)"
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        class="btn btn-danger"
                        style="margin: 4px 15px;"
                        @click="deleteSubject(subject.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
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
      form: {
        name: "",
        description: "",
        grade: "",
        grades: []
      },
      formEdit: {
        grades: []
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
      //   console.log("vm.pageNumber: "+vm.pageNumber);
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/search?page=" +
            vm.pageNumber +
            "&size=6&name=" +
            vm.textSearch
        )
        .then(function(response) {
          vm.subjects = response.data.data.content;
          vm.totalPages = response.data.data.totalPages;
          vm.pageNumber = response.data.data.number;
          // console.log("respone.data.data: "+respone.data.data.totalElements);
        });
    },
    submitEdit() {
      let formData = new FormData();
      let vm = this;
      formData.append("id", this.formEdit.id);
      formData.append("newName", this.formEdit.name);
      formData.append("newDescription", this.formEdit.description);
      formData.append("newGrade", this.formEdit.gradeId);
      if (typeof this.fileEditImage !== "undefined") {
        formData.append("newImage", this.fileEditImage);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
          vm.hideModalEdit();
          vm.Search();
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    submitCreate() {
      let formData = new FormData();
      let vm = this;
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("grade", this.form.gradeId);
      if (typeof this.fileImage !== "undefined") {
        formData.append("image", this.fileImage);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/create",
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
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/grade/search?page=0&size=100"
        )
        .then(response => {
          this.form.grades = response.data.data.content;
          this.$modal.show("create-subject");
        });
    },
    hideModalAdd() {
      this.$modal.hide("create-subject");
    },
    hideModalEdit() {
      this.$modal.hide("edit-subject");
    },
    showModalEdit(subject) {
      // const vm = this;
      this.formEdit = {
        id: subject.id,
        name: subject.name,
        description: subject.description,
        gradeId: subject.grade.id,
        grades: []
      };
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/grade/search?page=0&size=100"
        )
        .then(response => {
          this.formEdit.grades = response.data.data.content;
          this.$modal.show("edit-subject");
        });
      // this.$modal.show("edit-subject");
    },
    handleFileImageUpload() {
      this.fileImage = this.$refs.file.files[0];
    },
    handleEditImageUpload() {
      this.fileEditImage = this.$refs.fileEdit.files[0];
    },
    deleteSubject(subjectId) {
      const vm = this;
      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/subject/delete-by-id",
                { id: subjectId }
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
.class-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>