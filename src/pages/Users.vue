<template>
  <div>
    <navbar></navbar>
    <div class="classroom">
      <div class="card mt-80">
        <div class="box-search">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback" style="margin-top:0.8%!important;padding-right: 15%" ></span>
            <input
              type="text"
              class="form-control"
              v-on:keyup="Search()"
              v-model="textSearch"
              placeholder="Search"
            />
          </div>
          <button
            type="button"
            class="btn btn-success create-user"
            @click="showModalAdd()"
            style="margin-left: 57%;margin-top: -12%;"
          ><i class="fa fa-plus"></i></button>
        </div>
        <modal name="create-user" :height="550" class="padding-30" >
          <div style="padding: 30px!important">
            <form v-on:submit.prevent="submitCreate">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  User name(
                  <span class="red">*</span>)
                </label>
                <input type="text" class="form-control" id="userName" v-model="form.userName" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  Email(
                  <span class="red">*</span>)
                </label>
                <input type="text" class="form-control" id="email" v-model="form.email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  Password(
                  <span class="red">*</span>)
                </label>
                <input type="password" class="form-control" id="password" v-model="form.password" />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">
                  Role (
                  <span class="red">*</span>)
                </label>
                <select class="form-control" id="role" v-model="form.roleId">
                  <option
                    v-for="role in form.roles"
                    :key="role.id"
                    v-bind:value="role.id"
                  >{{ role.roleName }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlFile1">Avatar</label>
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

        <modal name="edit-user" :height="550">
          <div>
            <form v-on:submit.prevent="submitEdit" class="padding-30">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  User name(
                  <span class="red">*</span>)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  v-model="formEdit.editingUser.userName"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  Email(
                  <span class="red">*</span>)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  v-model="formEdit.editingUser.email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  New Password(
                  <span class="red">*</span>)
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="formEdit.editingUser.password"
                />
              </div>

              <div class="form-group">
                <label for="exampleFormControlFile1">Avatar</label>
                <input
                  type="file"
                  class="form-control-file"
                  ref="fileEdit"
                  id="fileEditImage"
                  v-on:change="handleEditAvaUpload()"
                />
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </modal>

        <table class="table member-list" style="margin-left:15%; width: 70%">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style="text-align:center">Action</th>
            </tr>
          </thead>
          <tr v-for="(user, key) in users" :key="key">
            <th scope="row">{{ 6*(pageNumber) +key + 1}}</th>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role.roleName }}</td>
            <td style="text-align:center">
              <button class="btn btn-default" style="margin: 4px 15px" @click="showModalEdit(user)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
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
import moment from "moment";
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
      form: {
        userName: "",
        email: "",
        password: "",
        roleId: "",
        roles: []
      },
      formEdit: {
        editingUser: {}
      },
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
    showModalAdd() {
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/role/get-all"
        )
        .then(response => {
          this.form.roles = response.data;
          console.log("this.form.roles: " + this.form.roles);
          this.$modal.show("create-user");
        });
    },
    hideModalAdd() {
      this.$modal.hide("create-user");
    },
    hideModalEdit() {
      this.$modal.hide("edit-user");
    },
    showModalEdit(user) {
      const vm = this;
      axios
        .get(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +
            user.userName
        )
        .then(function(response) {
          vm.formEdit.editingUser = response.data.data;
        });
      this.$modal.show("edit-user");
    },
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
          for (let i = 0; i < response.data.data.content.length; i++) {
            vm.users.push(response.data.data.content[i]);
          }
        });
    },
    submitEdit() {
      console.log("aaaaaaaaaaaaaaa");
      let formData = new FormData();
      let vm = this;
      let newPassword = this.formEdit.editingUser.password;
      let newUserName = this.formEdit.editingUser.userName;
      formData.append("id", this.formEdit.editingUser.id);
      formData.append("newUserName", this.formEdit.editingUser.userName);
      formData.append("newEmail", this.formEdit.editingUser.email);
      if (
        typeof newPassword !== "undefined" &&
        newPassword !== null &&
        newPassword.trim().length > 0
      ) {
        formData.append("newPassword", newPassword);
      }
      if (typeof this.fileEditImage !== "undefined") {
        formData.append("newAvatar", this.fileEditImage);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/update-by-id",
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
      formData.append("userName", this.form.userName);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("roleId", this.form.roleId);
      if (typeof this.fileImage !== "undefined") {
        formData.append("avatar", this.fileImage);
      }
      axios
        .post(
          "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/create",
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
    handleFileImageUpload() {
      this.fileImage = this.$refs.file.files[0];
    },
    handleEditAvaUpload() {
      this.fileEditImage = this.$refs.fileEdit.files[0];
    },
    changePage(pageNum) {
      if (pageNum === undefined) {
        this.pageNumber = 0;
      }
      this.pageNumber = pageNum - 1;
      this.Search();
    },
    removeUser(user) {
      const vm = this;
      const userId = user.id;
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