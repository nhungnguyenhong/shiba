<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="card mt-80">
        <div class="box-search">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
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
              <th>Action</th>
            </tr>
          </thead>
          <tr v-for="(user, key) in users" :key="key">
            <th scope="row">{{ 5*(pageNumber) +key + 1}}</th>
            <td>
              {{ user.userName }}
              <span v-if="you == user.userName">(You)</span>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <router-link
                class="btn btn-default"
                style="margin: 4px 15px"
                :to="{path: '/editUser',query: { name: user.userName }}"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>
              <button
                class="btn btn-danger"
                style="margin: 4px 15px;"
                @click="removeStudentInClass(user.id)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </table>
        <div class="text-center">
          <Pagination
            :page-count="total"
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
          <input
            type="text"
            class="form-control"
            v-on:keyup="Search()"
            v-model="emailStudent"
            placeholder="Email student"
          >
          <div class="text-center mt-20">
            <button type="button" class="btn btn-success" @click="addStudent()">
              <i class="fa fa-plus"></i> Add Student
            </button>
          </div>
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
      users: [],
      you: "",
      textSearch: "",
      pageNumber: 0,
      perPage: 8,
      total: 0,
      emailStudent: "",
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
    const vm = this;
    this.Search();
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
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/search?page=" +
            vm.pageNumber +
            "&size=10&sortBy=createTime&userName=" +
            vm.textSearch +
            "&email"
        )
        .then(function(respone) {
          vm.users = [];
          vm.total = respone.data.data.totalPages;
          for (let i = 0; i < respone.data.data.content.length; i++) {
            if (respone.data.data.content[i].role.id == 2) {
              vm.users.push(respone.data.data.content[i]);
            }
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
      this.$modal.show("add-student");
    },
    addStudent() {
      console.log(this.emailStudent);
    },
    removeStudentInClass(user_id) {
      const vm = this;
      
      swal.fire(this.swal_config)
        .then((isConfirm) => {
          if (isConfirm) {
             axios
                .post(
                  "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/registration/delete-by-id",
                  { id: user_id }
                )
          .then(function(respone) {
            swal.fire({
            }).catch(function() {
          Swal.fire("Oops...", "Somethings come wrongs!", "error");
        });
            vm.Search();
          });
          } else {
            swal("Your imaginary file is safe!");
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
.vm--modal {
  height: 200px !important;
}
</style>