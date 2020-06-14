  <template>
  <div>
    <navbar></navbar>
  <div class="section-light about-me" id="about-me">
        <div class="container">
          <div class="column is-12 about-me">
            <h1 class="title has-text-centered section-title">{{lesson.title}}</h1>
          </div>
          <div class="columns is-multiline">
            <div
              class="column is-4 has-vertically-aligned-content"
              data-aos="fade-right"
            >
              <p class="is-larger">
                &emsp;&emsp;<strong
                  >{{lesson.description}}</strong
                >
              </p>
              <br />
              <p>
                Showcase was built from the ground up with Bulma to be fast and
                responsive out of the box with all source files well documented
                for easy to customization. The Showcase template gives you a
                personal space to share what you are all about as a creative
                designer, developer, photographer, and more!
              </p>
              <br />
              <div class="is-divider"></div>
              <div class="columns about-links">
                <div class="column wid-033">
                  <p class="heading">
                    <strong>Teacher</strong>
                  </p>
                  <p class="subheading">
                    {{lesson.course.teacher.userName}}
                  </p>
                </div>
                <div class="column wid-033">
                  <p class="heading">
                    <strong>Email Me</strong>
                  </p>
                  <p class="subheading">
                    {{lesson.course.teacher.email}}
                  </p>
                </div>
                <div class="column wid-033">
                  <p class="heading">
                    <strong>Subject</strong>
                  </p>
                  <p class="subheading">
                   {{lesson.course.subject.name}}
                  </p>
                </div>
              </div>
            </div>
            <div class="column is-8 right-image " data-aos="fade-left">
              
              <iframe width="1280" height="720" :src="'https://www.youtube.com/embed/'+lesson.video +'?&autoplay=1&playsinline=1'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>
  </div>
<<<<<<< HEAD
=======
  <footer-component></footer-component>
>>>>>>> 24a4a72c3d9b31297c37c32d07915c4e2b06d61b
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
import axios from "axios";
export default {
  name: "lesson",
  data() {
    return {
      lesson: "",
    };
  },
  created() {
    var lesson_id = this.$route.query.id;
    const vm = this;
    axios
      .get(
        "http://shibalearningapp-env.eba-kj5ue4pd.us-east-1.elasticbeanstalk.com/lesson/get-by-id?id=" + lesson_id
      )
      .then(function(respone) {
          vm.lesson = respone.data.data;
          console.log(vm.lesson);
      })
      .catch(function() {
        Swal.fire("Oops...", "Somethings come wrongs!", "error");
      });
    
    
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
.title{
  font-size: 5rem;
  margin-bottom: 44px;
}
.right-image{
   height: 470px;

}
.right-image> iframe{
  height: 100%;
}
.wid-033{
  width: 33.3333333333%;
}
</style>
