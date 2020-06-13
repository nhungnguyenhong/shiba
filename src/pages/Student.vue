<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="card">
        <table class="table member-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th >Action</th>
            </tr>
          </thead>
          <tr v-for="(user, key) in users" :key="user.id">
            <th scope="row">{{ key + 1 }}</th>
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
                v-if="you != user.name"
                @click="remove(user.id)"
              >X</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import VueAxios from "vue-axios";
import axios from "axios";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
export default {
  data() {
    return {
      users: [],
      you: ""
    };
  },

  created() {
    this.you = this.$session.get("user");
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/search?page=0&size=10&sortBy=createTime"
      )
      .then(function(respone) {
        for (let i = 0; i < respone.data.data.content.length; i++) {
          if (respone.data.data.content[i].role.id == 2) {
            vm.users.push(respone.data.data.content[i]);
          }
        }
        console.log(vm.users);
      });
  },
  components: {
    navbar: navbar,
    footerComponent
  },
  methods: {
    remove(user_id) {
      console.log(user_id);
      axios
        .delete(`api/user/${user_id}`, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(response => {
          var index = this.users.findIndex(x => x.id == user_id);
          this.users.splice(index, 1);
        });
    }
  }
};
</script>