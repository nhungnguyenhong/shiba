<template>
  <div>
    <section class="hero is-medium height-100vh">
      <div class="hero-body">
        <div class="container main-header">
          <h1 class="title is-1">SHIBA LEARNING</h1>
          <h2 class="subtitle">
            E-learning website for primary school student
            <br>Wishing many happiness and successful of your
            experience in this website
          </h2>
          <a href="/login" class="button is-white is-medium is-inverted">
            Learn More&ensp;
            <i class="fad fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </section>
    <section id="parallax-1" class="hero is-large height-105vh">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6 main-header">
              <h1 class="title is-1">Convenient</h1>
              <hr class="content-divider">
              <h2
                class="subtitle"
              >Study any topic, anytime. Explore thousands of courses starting at $0 each</h2>
              <a href="/login" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-2" class="hero is-large height-107vh">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 main-header">
              <h1 class="title is-1">Find the Best Courses</h1>
              <hr class="content-divider">
              <h2 class="subtitle">All the top courses – from our school and the best our teachers.</h2>
              <a href="/login" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-3" class="hero is-large height-100vh">
      <div class="hero-body padding-0">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6 main-header">
              <h1 class="title is-1">Sign up right now</h1>
              <hr class="content-divider">
              <a href="/register" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
<style>
.va {
  display: flex;
  align-items: center;
}

.hero,
.cta {
  background: url("../assets/images/study.jpg");
  background-color: #e8530c;
}

.cta {
  height: 500px;
  border-top: 10px solid turquoise;
}

footer {
  color: white;
  background: rgb(14, 14, 14) !important;
}

footer strong {
  color: turquoise;
}

footer a {
  color: turquoise;
}

.title {
  color: white;
  font-weight: 800;
  font-size: 4rem;
  font-family: "Nunito Sans", sans-serif;
  text-shadow: 1px 1px 1px #000, 3px 3px 5px rgb(0, 0, 3);
}

.subtitle {
  color: white;
  font-size: 1.2rem;
  text-shadow: 1px 1px 1px #000, 3px 3px 5px rgb(0, 0, 3);
}

hr.content-divider {
  max-width: 75px;
  height: 5px;
}

#parallax-1 {
  background: url("../assets/images/shiba_cover.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 10px solid coral;
}

#parallax-1 hr {
  background: coral;
}

#parallax-2 {
  background: url("../assets/images/success.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 10px solid yellow;
}

#parallax-2 hr {
  background: yellow;
}

#parallax-3 {
  background: url("../assets/images/play.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* border-top: 10px solid hotpink; */
}

#parallax-3 hr {
  background: hotpink;
}

.label {
  color: white;
}

input {
  background: transparent !important;
  border: 1px solid turquoise !important;
  color: white !important;
}

input::placeholder {
  color: white !important;
}
.height-100vh {
  height: 100vh;
}
.height-105vh {
  height: 150vh;
}
.height-107vh {
  height: 150vh;
}
.main-header {
  text-align: center;
}
.main-header > h1 {
  text-align: center;
  font-size: 70px !important;
  margin-top: 90px;
}
.main-header > h2 {
  text-align: center;
  font-size: 30px;
  font-style: italic;
}
.main-header > a {
  height: 70px;
  width: 140px;
  background-color: #2ac741 !important;
  margin-top: 27px;
  /* text-align: center; */
  font-size: 17px;
  border-radius: 23px;
}
.main-header > a:hover {
  text-decoration: none;
  background-color: #2ac741 !important;
}
.padding-0 {
  padding-bottom: 0 !important;
}
</style>
