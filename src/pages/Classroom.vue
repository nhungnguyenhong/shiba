<template>
<div>
  <navbar></navbar>
  <div class="classroom" style="min-height: 500px" v-if="classroom">
    <div
      class="class-header"
    >
    
      <div class="cover-edit" v-if="coverEdit">
        <div class="cover-upload">
          <upload-cover :classroom-id="classroom.id" v-on:uploaded="coverUploaded"></upload-cover>
        </div>
        <div class="cover-edit-bottom">
          <div class="container">
            <button type="button" class="btn btn-default" @click="toggleCoverEdit">Done</button>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="col-md-8">
          <h1>{{ classroom.name }}</h1>
          <div class="class-description">{{ classroom.description }}</div>
        </div>
        <div class="col-md-4">
          <div class="class-teacher">
            <strong>Teachers</strong>
            <ul>
              <li >
                <div
                  class="profile-picture profile-picture-small"
                  :style="{backgroundImage : `url(${classroom.teacher.avatar})`} "
                ></div>
                <kbd>{{ classroom.teacher.name }}</kbd>
                <div class="clearfix"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container cover-bottom" v-if="!coverEdit">
        <div class="class-action">
          <div class="btn-group" role="group" aria-label="...">
            <router-link :to="classroom.id + '/post'" class="btn btn-default">New Post</router-link>
            <router-link
              :to="classroom.id + '/post/assignment'"
              v-if="isTeacher"
              class="btn btn-default"
            >New Assignment</router-link>

            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                <li>
                  <router-link :to="classroom.id + '/members'">Members</router-link>
                </li>
                <li role="separator" class="divider" v-if="isTeacher"></li>
                <li v-if="isTeacher">
                  <a href="javascript:void(0)" @click="toggleCoverEdit">Change cover photo</a>
                </li>
                <li v-if="isTeacher">
                  <router-link :to="`/classroom/${classroom.id}/edit`">Edit this classroom</router-link>
                </li>
                <li role="separator" class="divider" v-if="isTeacher"></li>
                <li v-if="isTeacher">
                  <a
                    href="javascript:void(0)"
                    v-bind:style="{color: '#a94442'}"
                    @click="deleteClass"
                  >Delete classroom</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- End class-action -->
      </div>
    </div>
    <div class="container" v-if="!posts.length">
      <div class="no-post">No post yet</div>
    </div>
    <div class="container" v-else>
      <div class="class-posts card" v-for="post in posts" :key="post">
        <div class="class-post-item" v-if="post.type === 'post'">
          <post-card
            :post="post"
            :classroom-id="classroom.id"
            :show-option="checkUserPost(post.course.id)"
            v-on:removePost="removePost"
          ></post-card>
          <attachments :files="post.attachments"></attachments>

          <div class="class-post-comments">
            <div class="comment-meta">
              <!-- <strong>{{ post.comments.length }} Comments</strong> -->
              <strong>1 Comments</strong>
            </div>
            <div class="comment-box">
              <form v-on:submit.prevent="comment(post.id)">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="comment"
                    placeholder="Comment..."
                    v-model="comments[post.id]"
                  >
                  <p
                    class="text-danger"
                    v-for="error in comment_errors.comment"
                    :key="error"
                  >{{ error }}</p>
                </div>
              </form>
            </div>
            <div class="comment-list">
              <div class="comment-list-item" v-for="comment in post.comments" :key="comment">
                <b>{{ comment.user.name }} :</b>
                {{ comment.comment }}
              </div>
            </div>
          </div>
        </div>
        <div class="class-post-item" v-if="post.type == 'assignment' && post.assignment">
          <assignment-card
            :post="post"
            :classroom-id="classroom.id"
            :show-option="checkUserPost(post.user.id)"
            v-on:removePost="removeAssignment"
          ></assignment-card>
          <attachments :files="post.attachments"></attachments>
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

export default {
  name: "classroom",
  data() {
    return {
      classroom: "",
      posts: [],
      lessons: "",
      comments: {},
      token: "",
      isTeacher : true,
      comment_errors: [],
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
      coverEdit: false
    };
  },
  created() {
    var classroom_id = this.$route.query.id;
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/get-by-id?id=" + classroom_id
      )
      .then(function(respone) {
          console.log(respone.data)
          vm.classroom = respone.data.data;
         console.log(vm.classroom)
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/search?page=0&size=10&courseId=" + classroom_id
      )
      .then(function(respone) {
          console.log(respone.data)
          vm.posts = respone.data.data.content;
         console.log(vm.posts)
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
  },
  components: {
    attachments,
    navbar,
    PostCard,
    AssignmentCard,
    uploadCover,
    footerComponent
  },
  // computed: {
  //   ...mapGetters(["getUserId", "isTeacher"])
  // },
  methods: {
    toggleCoverEdit() {
      this.coverEdit = !this.coverEdit;
    },
    
    comment(post_id) {
      var data = {
        post_id: post_id,
        comment: this.comments[post_id]
      };
    },
    checkUserPost(user_id) {
      //return this.getUserId == user_id;
      return 1==1;
    },
    removeAssignment(post_id) {
      var self = this;
      swal(this.swal_config).then(() => {
        axios
          .delete(`api/classroom/${self.classroom.id}/assignment/${post_id}`, {
            headers: {
              Authorization: "Bearer " + self.token
            }
          })
          .then(response => {
            var index = self.posts.findIndex(
              x => x.assignment.id == post_id && x.type == "assignment"
            );
            self.posts.splice(index, 1);

            console.log("remove success");
          });
      });
    },
    removePost(post_id) {
      var self = this;
      swal(this.swal_config).then(() => {
        axios
          .delete(`api/post/${post_id}`, {
            headers: {
              Authorization: "Bearer " + self.token
            }
          })
          .then(response => {
            var index = self.posts.findIndex(
              x => x.id == post_id && x.type == "post"
            );
            self.posts.splice(index, 1);

            console.log("remove success");
          });
      });
    },
    deleteClass() {
      var self = this;
      swal(this.swal_config).then(() => {
        axios
          .delete(`api/classroom/${self.classroom.id}`, {
            headers: {
              Authorization: "Bearer " + self.token
            }
          })
          .then(response => {
            console.log("remove class success");
            self.$router.push("/");
          });
      });
    },
    coverUploaded(url) {
      this.classroom.cover_url = url;
    }
  }
};
</script>
<style>

.class-header {
    background-image: linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3));
    background-image: url('../assets/images/bg.jpeg');
}
</style>
