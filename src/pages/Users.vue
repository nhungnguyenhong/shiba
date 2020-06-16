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
            />
          </div>
        </div>

        <table class="table member-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tr v-for="(user, key) in users" :key="key">
            <th scope="row">{{ 6*(pageNumber) +key + 1}}</th>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role.roleName }}</td>
            <td>
              <router-link
                class="btn btn-default"
                style="margin: 4px 15px"
                :to="{path: '/editUser',query: { name: user.userName }}"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>
              <button class="btn btn-danger" style="margin: 4px 15px;" @click="removeUser(user)">
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
      textSearch: "",
      pageNumber: 0,
      perPage: 3,
      totalPages: 0,
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
            "&size=6&userName=" +
            vm.textSearch
        )
        .then(function(response) {
          vm.users = [];
          vm.totalPages = response.data.data.totalPages;
          console.log(
            "response.data.data.content: " + response.data.data.content
          );
          for (let i = 0; i < response.data.data.content.length; i++) {
            vm.users.push(response.data.data.content[i]);
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
    removeUser(user) {
      const vm = this;
      const userId = userId.id;
      swal.fire(this.swal_config).then(r => {
        if (typeof r.value != undefined)
          if (r.value === true) {
            axios
              .post(
                "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/delete-by-id",
                { id: userId }
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