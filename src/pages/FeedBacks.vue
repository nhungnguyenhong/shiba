<template>
  <div>
    <navbar></navbar>

    <div class="classroom" style="min-height: 500px" v-if="classroom">
      <div class="class-header">
        <div class="container">
          <div class="col-md-8 text-align-center">
            <h1 class="class-title">{{ toUpperCase( classroom.name )}}</h1>
            <div class="class-description">{{ classroom.description }}</div>
            <div class="class-description">average rate: {{ classroom.rate }}/10</div>
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
      </div>&nbsp;
      <div class="box-search">
        <button
          v-if="!isJoined"
          class="button is-success button-let-go"
          disabled="true"
        >Join to add Comment</button>
        <button
          v-if="isJoined"
          class="button is-success button-let-go"
          @click="showModalAdd()"
        >Add Comment</button>
      </div>
      <modal name="add-comment" :height="540">
        <div>
          <form v-on:submit.prevent="submitAddComment" class="padding-30">
            <h2>Rating about this Course:</h2>
            <star-rating v-bind:max-rating="10" v-model="formAdd.rate"></star-rating>
            <h2>Comment:</h2>
            <ckeditor class="editor" :editor="editor" v-model="formAdd.comment" :config="editorConfig"></ckeditor>
            <button class="btn btn-primary" style="margin-left:40%; margin-top:10px">Submit</button>
          </form>
        </div>
      </modal>
      <modal name="edit-comment" :height="350">
        <div>
          <form v-on:submit.prevent="submitEditComment" class="padding-30">
            <div class="form-group">
              <label for="exampleInputEmail1">Rate</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="formEdit.editingFeedBack.rate"
                placeholder="0<= rate <=10"
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Comment</label>
              <input
                type="textarea"
                class="form-control"
                id="comment"
                placeholder="Bla...bla...bla..."
                v-model="formEdit.editingFeedBack.comment"
              >
            </div>

            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </modal>
      <div class="container" v-if="!feedBacks.length">
        <div class="no-post">No feedBack yet</div>
      </div>
      <div class="container" v-else>
        <section class="container">
          <div class="columns features">
            <div class="card is-shady wid-100">
              <div class="class-posts card" v-for="feedBack in feedBacks" :key="feedBack.id">
                <div class="review mt-4">
                  <div class="d-flex flex-row comment-user">
                    <img v-if="!feedBack.user.avatar" src="../assets/images/avatar.svg" width="60">
                    <img class="rounded" v-bind:src="feedBack.user.avatar" width="60">
                    <div class="ml-2">
                      <div class="d-flex flex-row align-items-center">
                        <span class="name font-weight-bold">
                          student:
                          <b>{{feedBack.user.userName}}</b>
                        </span>
                        <span class="dot"></span>
                        <span class="date">
                          create at:
                          <b>{{feedBack.createTime}}</b>
                        </span>
                      </div>
                      <div class="rating">
                        <span>Rate: {{feedBack.rate}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2">
                    <p class="comment-text">{{feedBack.comment}}</p>
                  </div>
                  <button
                    v-if="checkDeleteRole(feedBack.user.id)"
                    type="button"
                    class="btn btn-danger button-delete-1"
                    @click="deleteFeedBack(feedBack.id)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                  <button
                    v-if="checkDeleteRole(feedBack.user.id)"
                    type="button"
                    class="button button-success-1"
                    @click="showModalEdit(feedBack)"
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StarRating from "vue-star-rating";

Vue.use(Pagination);
Vue.use(VModal);
export default {
  name: "classroom",
  data() {
    return {
      thisCourseId: this.$route.query.courseId,
      currentUser: this.$session.get("currentUser"),
      isJoined: true,
      isCommented: true,
      classroom: "",
      feedBacks: [],
      comments: {},
      file: "",
      formAdd: {
        rate: "",
        comment: ""
      },
      formEdit: {
        editingFeedBack: {}
      },
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
      coverEdit: false,
      pageNumber: 0,
      perPage: 8,
      totalPages: 0,
      total: 0,
      textSearch: "",
      editor: ClassicEditor,
      editorData: "<p>Enter your Feedback about Shiba Learning here.</p>",
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  props: {
    rating: 0
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
    Pagination,
    StarRating
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
    showModalAdd() {
      this.$modal.show("add-comment");
    },
    hideModalAdd() {
      this.$modal.hide("add-comment");
    },
    submitAddComment() {
      const vm = this;
      const feedBack = {
        studentId: this.currentUser.id,
        courseId: this.thisCourseId,
        rate: this.formAdd.rate,
        comment: this.formAdd.comment
      };
      console.log(feedBack);
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/feedback/create",
          feedBack
        )
        .then(function() {
          vm.hideModalAdd();
          vm.getData();
        })
        .catch(function() {});
    },
    submitEditComment() {
      const vm = this;
      const feedBackUpdate = {
        id: this.formEdit.editingFeedBack.id,
        newRate: parseFloat(this.formEdit.editingFeedBack.rate),
        newComment: this.formEdit.editingFeedBack.comment
      };
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/feedback/update",
          feedBackUpdate
        )
        .then(function() {
          console.log("SUCCESS!!");
          vm.hideModalEdit();
          vm.getData();
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    getData() {
      var classroom_id = this.thisCourseId;
      const vm = this;
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/get-by-id?id=" +
            classroom_id
        )
        .then(function(response) {
          vm.classroom = response.data.data;
        })
        .catch(function() {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        });
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/feedback/search?page=" +
            vm.pageNumber +
            "&size=5&courseId=" +
            classroom_id
        )
        .then(function(response) {
          vm.feedBacks = response.data.data.content;
          vm.totalPages = response.data.data.totalPages;
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
    checkDeleteRole(studentId) {
      const currentUser = this.$session.get("currentUser");
      if (currentUser.role.roleName === "admin") {
        return true;
      }
      if (currentUser.id === studentId) {
        return true;
      }
      return false;
    },
    checkJoin() {
      const vm = this;
      const currentUser = vm.$session.get("currentUser");
      const courseId = vm.thisCourseId;

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
        });
    },
    deleteFeedBack(feedBackId) {
      const vm = this;

      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/feedback/delete-by-id",
                { id: feedBackId }
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
    hideModalEdit() {
      this.$modal.hide("edit-comment");
    },
    showModalEdit(feedBack) {
      this.formEdit.editingFeedBack = {
        id: feedBack.id,
        rate: feedBack.rate,
        comment: feedBack.comment
      };
      this.$modal.show("edit-comment");
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
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap");

.cross {
  padding: 10px;
  color: #d6312d;
  cursor: pointer;
  font-size: 23px;
}

.cross i {
  margin-top: -5px;
  cursor: pointer;
}

.ck {
  height: 200px;
}
.comment-box {
  padding: 5px;
}

.comment-area textarea {
  resize: none;
  border: 1px solid #ff0000;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #ffffff;
  outline: 0;
  box-shadow: 0 0 0 1px rgb(255, 0, 0) !important;
}

.send {
  color: #fff;
  background-color: #ff0000;
  border-color: #ff0000;
}

.send:hover {
  color: #fff;
  background-color: #f50202;
  border-color: #f50202;
}

.rating {
  display: inline-flex;
  margin-top: -10px;
  flex-direction: row-reverse;
}

.rating > input {
  display: none;
}

.rating > label {
  position: relative;
  width: 28px;
  font-size: 35px;
  color: #ff0000;
  cursor: pointer;
}

.rating > label::before {
  content: "\2605";
  position: absolute;
  opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
  opacity: 1 !important;
}

.rating > input:checked ~ label:before {
  opacity: 1;
}

.rating:hover > input:checked ~ label:before {
  opacity: 0.4;
}
</style>