<template>
  <div>
    <navbar></navbar>

    <div class="classroom" style="min-height: 500px" v-if="classroom">
      <div class="class-header">
        <div class="container">
          <div class="col-md-8 text-align-center">
            <h1 class="class-title">{{ toUpperCase( classroom.name )}}</h1>
            <div class="class-description">{{ classroom.description }}</div>
          </div>
          <div class="col-md-4">
            <div class="class-teacher">
              <strong>Teachers</strong>
              <ul>
                <li>
                  <div
                    class="profile-picture profile-picture-small"
                    :style="{backgroundImage : `url(${classroom.teacher.avatar})`} "
                  ></div>
                  <kbd>{{ classroom.teacher.userName }}</kbd>
                  <div class="clearfix"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="box-search">
        <div class="form-group has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            class="form-control"
            v-on:keyup="getData()"
            v-model="textSearch"
            placeholder="Search"
          />
        </div>
        <button
          v-if="getRole() === 'admin' || getRole() === 'teacher'"
          type="button"
          class="btn btn-success add-lesson"
          @click="showModalAdd()"
        >Add lesson</button>
        <button
          v-if="getRole() === 'student' && !isJoined"
          type="button"
          class="btn btn-success add-lesson"
          @click="joinCourse()"
        >Join</button>
      </div>
      <modal name="add-lesson" :height="450">
        <div>
          <form v-on:submit.prevent="submitFile" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">
                Lesson title(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="title" v-model="form.title" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Lesson description(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="description" v-model="form.description" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Lesson document(
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="document" v-model="form.document" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Lesson video (
                <span class="red">*</span>)
              </label>
              <input type="text" class="form-control" id="video" v-model="form.video" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Lesson image</label>
              <input
                type="file"
                class="form-control-file"
                ref="file"
                id="file"
                v-on:change="handleFileUpload()"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>

      <modal name="edit-lesson" :height="450">
        <div>
          <form v-on:submit.prevent="submitEdit" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">Lesson title</label>
              <input type="text" class="form-control" id="title" v-model="form_edit.title" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lesson description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="form_edit.description"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lesson document</label>
              <input type="text" class="form-control" id="document" v-model="form_edit.document" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lesson video</label>
              <input type="text" class="form-control" id="video" v-model="form_edit.video" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Lesson image</label>
              <input
                type="file"
                class="form-control-file"
                ref="file"
                id="file"
                v-on:change="handleFileUpload()"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>

      <div class="container" v-if="!posts.length">
        <div class="no-post">No post yet</div>
      </div>
      <div class="container" v-else>
        <section class="container">
          <div class="columns features">
            <div class="card is-shady wid-100">
              <div class="class-posts card" v-for="(post, index) in posts" :key="post.id">
                <div class="card-image container-post">
                  <figure class="image is-4by3">
                    <img v-bind:src="post.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content container-post-content">
                  <div class="content">
                    <h4>{{post.title}}</h4>
                    <p>{{post.description}}</p>
                    <div class="buttons margin-button">
                      <button class="button is-success button-let-go">
                        <router-link :to="{path: '/lesson',query: { id: post.id }}">Let's go</router-link>
                      </button>
                      <button
                        v-if="getRole() === 'admin' || getRole() === 'teacher'"
                        type="button"
                        class="btn btn-danger button-delete"
                        @click="removeLesson(post.id)"
                      >Remove</button>
                      <button
                        v-if="getRole() === 'admin' || getRole() === 'teacher'"
                        type="button"
                        class="btn btn-info button-edit"
                        @click="openEditLesson(index,post.id)"
                      >Edit</button>
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
    <div class="spinner" v-else>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapGetters } from "vuex";
import attachments from "./block/attachment.vue";
import PostCard from "./block/PostCard.vue";
import AssignmentCard from "./block/AssignmentCard.vue";
import uploadCover from "./block/uploadCover.vue";
import navbar from "./NavbarComponent.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import Swal from "sweetalert2";
import footerComponent from "./footer.vue";
import Pagination from "vuejs-paginate";
import VModal from "vue-js-modal";
Vue.use(Pagination);
Vue.use(VModal);
export default {
  name: "classroom",
  data() {
    return {
      form: {
        title: "",
        description: "",
        document: "",
        video: ""
      },
      form_edit: {
        title: "",
        description: "",
        document: "",
        video: ""
      },
      thisCourseId: this.$route.query.id,
      isJoined: true,
      classroom: "",
      posts: [],
      lessons: "",
      comments: {},
      token: "",
      isTeacher: true,
      file: "",
      comment_errors: [],
      current_lesson_id: 0,
      current_lesson_index: 0,
      focus_id: "",
      swal_config: {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      },
      swal_config_join: {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, join this course!"
      },
      coverEdit: false,
      pageNumber: 0,
      perPage: 8,
      totalPages: 0,
      total: 5,
      textSearch: ""
    };
  },
  created() {
    this.getData();
    this.checkJoin();
  },
  components: {
    attachments,
    navbar,
    PostCard,
    AssignmentCard,
    uploadCover,
    footerComponent,
    Pagination
  },
  methods: {
    toggleCoverEdit() {
      this.coverEdit = !this.coverEdit;
    },
    toUpperCase(input) {
      return input.toUpperCase();
    },
    comment(post_id) {
      var data = {
        post_id: post_id,
        comment: this.comments[post_id]
      };
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      let vm = this;
      var classroomId = this.$route.query.id;
      formData.append("courseId", classroomId);
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("video", this.form.video);
      formData.append("document", this.form.document);
      if (!!this.file) {
        formData.append("image", this.file);
      }
      for (var value of formData.values()) {
        console.log(value);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/create",
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
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    submitEdit() {
      let formData = new FormData();
      let vm = this;
      formData.append("id", parseInt(this.current_lesson_id));
      formData.append("newTitle", this.form_edit.title);
      formData.append("newDescription", this.form_edit.description);
      formData.append("newDocument", this.form_edit.video);
      formData.append("newVideo", this.form_edit.document);
      if (!!this.file) {
        formData.append("newImage", this.file);
      }
      for (var value of formData.values()) {
        console.log(value);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/update",
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
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    getData() {
      var classroom_id = this.$route.query.id;
      const vm = this;
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/get-by-id?id=" +
            classroom_id
        )
        .then(function(respone) {
          vm.classroom = respone.data.data;
        })
        .catch(function() {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        });
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/search?page=" +
            vm.pageNumber +
            "&size=5&courseId=" +
            classroom_id +
            "&title=" +
            vm.textSearch
        )
        .then(function(respone) {
          vm.posts = respone.data.data.content;
          console.log(vm.posts[0]);
          vm.totalPages = respone.data.data.totalPages;
        })
        .catch(function() {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        });
    },
    checkUserPost(user_id) {
      //return this.getUserId == user_id;
      return 1 == 1;
    },
    getRole() {
      this.currentUser = this.$session.get("currentUser");
      return this.currentUser.role.roleName;
    },
    checkJoin() {
      const vm = this;
      const currentUser = vm.$session.get("currentUser");
      const courseId = vm.thisCourseId;
      console.log("courseId: " + courseId);
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/search?page=0&size=10" +
            "&studentId=" +
            currentUser.id +
            "&courseId=" +
            courseId
        )
        .then(function(response) {
          if (response.data.data.totalElements > 0) {
            vm.isJoined = true;
          } else {
            vm.isJoined = false;
          }
          console.log(vm.isJoined);
        });
    },
    joinCourse() {
      const vm = this;
      const courseId = vm.thisCourseId;
      const currentUser = vm.$session.get("currentUser");
      swal.fire(this.swal_config_join).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/create",
                { courseId: courseId, studentId: currentUser.id }
              )
              .then(function(respone) {
                vm.getData();
                vm.checkJoin();
              });
          }
      });
    },
    removeLesson(post_id) {
      const vm = this;

      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/delete-by-id",
                { id: post_id }
              )
              .then(function(respone) {
                vm.getData();
              });
          }
      });
    },
    removeAssignment(post_id) {},
    removePost(post_id) {},
    deleteClass() {},
    coverUploaded(url) {
      this.classroom.cover_url = url;
    },
    changePage(pageNum) {
      if (pageNum === undefined) {
        this.pageNumber = 0;
      }
      this.pageNumber = pageNum - 1;
      this.getData();
    },
    showModalAdd() {
      this.$modal.show("add-lesson");
    },
    hideModalAdd() {
      this.$modal.hide("add-lesson");
    },
    hideModalEdit() {
      this.$modal.hide("edit-lesson");
    },
    openEditLesson(index, post_id) {
      this.current_lesson_id = post_id;
      this.current_lesson_index = index;
      this.$modal.show("edit-lesson");
      this.form_edit = this.posts[index];
    }
  },
  mounted() {
    let cdn1 = document.createElement("script");
    cdn1.setAttribute(
      "src",
      "https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js"
    );
    document.head.appendChild(cdn1);
  }
};
</script>
<style>
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
}
.button-edit {
  position: absolute;
  top: 0;
  left: 265px;
  width: 100px;
  height: 50px;
  font-size: 18px;
}
</style>