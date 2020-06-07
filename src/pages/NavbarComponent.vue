<template>
<nav class="navbar navbar-default navbar-wrapper" v-if="isLoggedIn" v-bind:class="{transparent: transparent}">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-dropdown-menu-small" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link to="/" class="navbar-brand">
        <img src="../assets/images/Med_logo.png"/>
      </router-link>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="navbar-dropdown-menu-small">
      <ul class="nav navbar-nav">
        <li class="dropdown" v-if="isTeacher">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User Management<span class="caret"></span></a>
          <ul class="dropdown-content">
            <li><router-link to="/user">View all User</router-link></li>
            <li><router-link to="/user/create">Create User</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Recommand<span class="caret"></span></a>
          <ul class="dropdown-content">
            <li><router-link to="/user"></router-link></li>
            <li><router-link to="/user/create"></router-link></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="isLoggedIn">
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ getName }}<span class="caret"></span></a>
          <ul class="dropdown-content">
            <li><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/logout">Logout</router-link></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>


<script>
  import { mapGetters } from 'vuex'
  import VueAxios from 'vue-axios';
  import axios from 'axios';
import { constants } from 'http2';

  export default {
    created() {
    this.getName = this.$route.params.userName;
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/user/get-by-username?userName=" +
          this.getName
      )
      .then(function(respone) {
        vm.getUser = respone.data.data;
        if (vm.getUser.roleId === "1") {
          vm.isTeacher = true;
        } else {
          vm.isTeacher = false;
        }
      })
   },
    data(){
      return {
        transparent: false,
        hide: false,
        isTeacher: '',
        isLoggedIn: true,
        getName: this.username
      }
    },
    methods:{
      setStyle(route){
        this.transparent = false
        this.hide = false
        if(route.meta.navstyle){
          if(route.meta.navstyle.transparent){
            this.transparent = route.meta.navstyle.transparent
          }

          if(route.meta.navstyle.hide){
            this.hide = route.meta.navstyle.hide
          }
        }
      }
    }
  }
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #dddddd;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.navbar-right {
  margin-right: -300%;
}
</style>
