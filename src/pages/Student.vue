<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="card mt-80">
        <div class="box-search">
          <div class="form-group has-search">
            <i
              class="fa fa-search form-control-feedback"
              style="margin-top:2%!important; margin-:-16%!important"
            ></i>
            <input
              type="text"
              class="form-control"
              v-on:keyup="Search()"
              v-model="textSearch"
              placeholder="Search"
            >
          </div>
        </div>
        <div class="text-right">
          <button type="button" class="btn btn-success" @click="showModalAdd()">
            <i class="fa fa-plus"></i> Add Student
          </button>
        </div>
        <table class="table member-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Point</th>
              <th>Action</th>
            </tr>
          </thead>
          <tr v-for="(user, key) in users" :key="key">
            <th scope="row">{{ 5*(pageNumber) +key + 1}}</th>
            <td>
              {{ user.user.userName }}
              <span v-if="you == user.user.userName">(You)</span>
            </td>
            <td>{{ user.user.email }}</td>
            <td>{{ user.course.name }}</td>
            <td>{{ user.point }}</td>
            <td>
              <button
                class="btn btn-default"
                style="margin: 4px 15px;"
                @click="showModalEdit(user)"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button
                class="btn btn-danger"
                style="margin: 4px 15px;"
                @click="removeStudentInClass(user)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </table>
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
    <modal name="add-student">
      <div class="box-add">
        <div class="form-group">
          <label for="exampleInputPassword1">
            Email (
            <span class="red">*</span>)
          </label>
          <input
            type="text"
            class="form-control"
            v-model="form.studentEmail"
            placeholder="Email student"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">
            Course (
            <span class="red">*</span>)
          </label>
          <select class="form-control" id="course" v-model="form.courseId">
            <option
              v-for="course in form.courses"
              :key="course.id"
              v-bind:value="course.id"
            >{{course.name}}</option>
          </select>
        </div>
        <div class="text-center mt-20">
          <button type="button" class="btn btn-success" @click="addStudent()">
            <i class="fa fa-plus"></i> Add Student
          </button>
        </div>
      </div>
    </modal>
    <modal name="edit-registration" :height="350">
      <div class="box-add">
        <div class="form-group">
          <label for="exampleInputPassword1">
            Student(
            <span class="red">*</span>)
          </label>
          <input
            disabled="true"
            type="text"
            class="form-control"
            v-model="formEdit.editingRegistration.student.userName"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">
            Course (
            <span class="red">*</span>)
          </label>
          <input
            disabled="true"
            type="text"
            class="form-control"
            v-model="formEdit.editingRegistration.course.name"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">
            Point (
            <span class="red">*</span>)
          </label>
          <input
            type="text"
            class="form-control"
            v-model="formEdit.editingRegistration.point"
            placeholder="point/10"
          >
        </div>
        <div class="text-center mt-20">
          <button type="button" class="btn btn-success" @click="updatePoint()">Save</button>
        </div>
      </div>
    </modal>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Vue from "vue";

import VueAxios from "vue-axios";
import axios from "axios";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
import Pagination from "vuejs-paginate";
import VModal from "vue-js-modal";
import swal from "sweetalert2";

Vue.use(Pagination);
Vue.use(VModal);
export default {
  data() {
    return {
      form: {
        studentEmail: "",
        courseId: "",
        courses: []
      },
      formEdit: {
        editingRegistration: {
          course: {},
          student: {},
          point: ""
        },
        courseId: "",
        studentId: "",
        point: ""
      },
      users: [],
      you: "",
      textSearch: "",
      pageNumber: 0,
      perPage: 3,
      courseID: 1,
      total: 2,
      totalPages: 2,
      getUser: {},
      swal_config: {
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: true
      }
    };
  },

  created() {
    this.you = this.$session.get("user");
    this.getName = this.$session.get("user");
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +
          this.getName
      )
      .then(function(respone) {
        vm.getUser = respone.data.data;
        vm.Search();
      });

    // this.Search();
  },
  components: {
    navbar: navbar,
    footerComponent,
    Pagination
  },
  computed: {},
  methods: {
    Search() {
      const vm = this;

      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/search-by-teacherId?page=" +
            vm.pageNumber +
            "&size=5&teacherId=" +
            vm.getUser.id +
            "&studentName=" +
            vm.textSearch
        )
        .then(function(respone) {
          vm.users = [];
          vm.totalPages = respone.data.data.totalPages;
          vm.total = respone.data.data.content.length;
          for (let i = 0; i < respone.data.data.content.length; i++) {
            vm.users.push(respone.data.data.content[i]);
          }
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
      var id = parseInt(this.$session.get("currentUser").id);
      const vm = this;
      vm.form.courses.splice(0);
      var register_to_get_course = [];
      var arr_course = [];
      var obj = {};
      var arr = [];
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/course/get-all" +
            "?teacherId=" +
            this.$session.get("currentUser").id
        )
        .then(response => {
          register_to_get_course = response.data.data.content;
          console.log(register_to_get_course);
          for (let i = 0; i < register_to_get_course.length; i++) {
            arr_course.push(register_to_get_course[i].course);
          }
          for (var i = 0, len = arr_course.length; i < len; i++)
            obj[arr_course[i]["id"]] = arr_course[i];
          for (var key in obj) arr.push(obj[key]);
          console.log(arr);
          vm.form.courses = arr;
          vm.$modal.show("add-student");
        });
    },
    hideModalAdd() {
      this.$modal.hide("add-student");
    },
    hideModalEdit() {
      this.$modal.hide("edit-registration");
    },
    showModalEdit(registration) {
      this.formEdit.editingRegistration = {
        course: registration.course,
        student: registration.user,
        point: registration.point
      };
      this.$modal.show("edit-registration");
    },
    updatePoint() {
      const vm = this;
      vm.formEdit.courseId = this.formEdit.editingRegistration.course.id;
      vm.formEdit.studentId = this.formEdit.editingRegistration.student.id;
      vm.formEdit.point = this.formEdit.editingRegistration.point / 2;
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/update-point",
          vm.formEdit
        )
        .then(function() {
          vm.hideModalEdit();
          vm.Search();
        })
        .catch(function() {});
    },
    addStudent() {
      const vm = this;
      vm.form.studentEmail = this.form.studentEmail;
      vm.form.courseId = this.form.courseId;
      console.log(vm.form);
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/add-student-to-course",
          vm.form
        )
        .then(function() {
          vm.hideModalAdd();

          vm.Search();
        })
        .catch(function() {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        });
    },
    removeStudentInClass(registration) {
      const vm = this;
      const registrationId = registration.id;
      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/delete-by-id",
                { id: registrationId }
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
/* Bootstrap 4 text input with search icon */

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
}
.box-add {
  width: 90%;
  margin: 50px auto;
}
.mt-20 {
  margin-top: 20px;
}
</style>