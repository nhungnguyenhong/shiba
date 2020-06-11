<template>
<div>
  <navbar></navbar>
   <div class="classroom" style="min-height: 500px" v-if="grades">
       <div class="container">
        <div
          class="classroom-list col-md-4"
          v-for="grade in grades"
          v-bind:key="grade.id"
        >
          <div class="card">
            <div class="classroom-background">
              <img src="../assets/images/classroom.svg" class="img-responsive">
            </div>
            <div class="classroom-list-head">
              <h3>
                <router-link :to="{path: '/subject',query: { id: grade.id }}">Grade {{ grade.id }}</router-link>
              </h3>
            </div>
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
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";

export default {
  name: "Grade",
  data() {
    return {
     grades: [
         {id: '1', name: 'Grade 1'},
         {id: '2', name: 'Grade 2'},
         {id: '3', name: 'Grade 3'},
         {id: '4', name: 'Grade 4'},
         {id: '5', name: 'Grade 5'},
         {id: '6', name: 'Grade 6'}
     ],
    };
  },
  components: {
    navbar: navbar,
    footerComponent
  },
  methods: {

  }
};
</script>
<style>
.class-header {
    background-image: linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3))
}
</style>
