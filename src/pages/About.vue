<template>
<div>
<navbar></navbar>
  <div class="container about-us">
    <div class="card">
      <h1>About us</h1>
      <div class="row">
        <div class="col-md-4 about-us-item">
          <img src="../assets/images/about-us/Nhunn.jpg" class="about-us-thumbnail img-responsive">
          <p class="about-us-name">Nhung Nguyen Hong</p>
          <p>
            <a href="https://www.facebook.com/quynhnhu.kieu.39">
              <img src="../assets/images/facebook.svg" height="25px"> Facebook
            </a>
          </p>
        </div>
        <div class="col-md-4 about-us-item">
          <img src="../assets/images/about-us/Cong.jpg" class="about-us-thumbnail img-responsive">
          <p class="about-us-name">Tran Manh Cong</p>
          <p>
            <a href="https://www.facebook.com/tranmanhcong20165829">
              <img src="../assets/images/facebook.svg" height="25px"> Facebook
            </a>
          </p>
        </div>
        <div class="col-md-4 about-us-item">
          <img src="../assets/images/about-us/Danh.jpg" class="about-us-thumbnail img-responsive">
          <p class="about-us-name">Duc Anh Nguyen</p>
          <p>
            <a href="https://www.facebook.com/zenny.nguyen.3551">
              <img src="../assets/images/facebook.svg" height="25px"> Facebook
            </a>
          </p>
        </div>
        <div class="col-md-4 about-us-item">
          <img src="../assets/images/about-us/Hung.jpg" class="about-us-thumbnail img-responsive">
          <p class="about-us-name">Ninh Manh Hung</p>
          <p>
            <a href="https://www.facebook.com/hungberock">
              <img src="../assets/images/facebook.svg" height="25px"> Facebook
            </a>
          </p>
        </div>
        <div class="col-md-4 about-us-item">
          <img src="../assets/images/about-us/hoang.jpg" class="about-us-thumbnail img-responsive">
          <p class="about-us-name">La Vu Hoang</p>
          <p>
            <a href="https://www.facebook.com/lavuhoang.1998">
              <img src="../assets/images/facebook.svg" height="25px"> Facebook
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer-component></footer-component>
</div>
</template>

<script>
import navbar from "./NavbarComponent.vue";
import footerComponent from "./footer.vue";
export default {
  components: {
    navbar: navbar,
    footerComponent
  }
};
</script>