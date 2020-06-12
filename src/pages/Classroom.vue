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
                <kbd>{{ classroom.teacher.userName }}</kbd>
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
      <section class="container">
      <div class="columns features">
          <div class="card is-shady wid-100">
      <div class="class-posts card" v-for="post in posts" :key="post">
        
            <div class="card-image container-post">
              <figure class="image is-4by3">
                <img v-bind:src="post.image" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content container-post-content">
              <div class="content">
                <h4>{{post.title}}</h4>
                <p>{{post.description}}</p>
                <span class="button is-link modal-button" v-bind:data-target="'modal-card'+post.id">Chi tiết</span>
              </div>
            </div>
            <div v-bind:id="'modal-card'+post.id" class="modal modal-fx-3dSlit">
              <div class="modal-background"></div>
              <div class="modal-content is-tiny">
        <!-- content -->
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img v-bind:src="post.image"  alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img v-bind:src="classroom.teacher.avatar" alt="linda barret avatar">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{classroom.teacher.userName}}</p>
                <p class="subtitle is-6">@{{classroom.teacher.userName}}</p>
              </div>
            </div>
            <div class="content">
             {{post.description}}
              <a>@{{classroom.teacher.userName}}</a>.
              <a href="#">#{{classroom.subject.name}}</a>
              
              <br>
              <time datetime="2020-02-03">12:45 AM - 20 June 2018</time>
            </div>
          </div>
        </div>
        <!-- end content -->
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
  </div>
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
  },
  mounted() {
    
      let cdn1 = document.createElement('script')
      cdn1.setAttribute('src', 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js')
      document.head.appendChild(cdn1)
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
    background-image: linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3));
    background-image: url('../assets/images/bg.jpeg');
}
</style>
