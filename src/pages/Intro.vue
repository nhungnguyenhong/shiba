<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Shiba Learning</h1>
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
    <section id="parallax-1" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1">Happiness</h1>
              <hr class="content-divider">
              <h2
                class="subtitle"
              >Happiness is a state, not a trait; in other words, it isn’t a long-lasting, permanent feature or personality trait, but a more fleeting, changeable state</h2>
              <a href="#" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-2" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6">
              <h1 class="title is-1">Successful</h1>
              <hr class="content-divider">
              <h2
                class="subtitle"
              >Be Yourself and freedom</h2>
              <a href="#" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-3" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1">Play</h1>
              <hr class="content-divider">
              <h2
                class="subtitle"
              >Playtime has never been more scarce, or important, in today’s frantic scramble to academically prepare our children.</h2>
              <a href="#" class="button is-white is-inverted">
                Next&ensp;
                <i class="fad fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero va">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <h1 class="title is-1">Adipisicing Elit</h1>
            <hr class="content-divider">
            <h2
              class="subtitle"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ut nulla maiores, beatae voluptas sunt excepturi deserunt vero. Beatae est ratione quia neque molestias, cum asperiores quibusdam rem illum, debitis dolorem natus, eos fuga eveniet numquam ab officia reiciendis inventore. Tempore repudiandae exercitationem quisquam? Fugiat!</h2>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input is-medium" type="text" placeholder="Jon Snow">
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input is-medium" type="email" placeholder="jon@winterfell.com">
              </div>
            </div>
            <br>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-white is-rounded is-outlined">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


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
  border-top: 10px solid hotpink;
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
</style>
