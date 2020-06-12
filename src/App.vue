<template>
    <div id="app">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import navbar from './pages/NavbarComponent.vue'
    import footerComponent from './pages/footer.vue'

    export default {
        name: 'App',
        components : {
            'navbar': navbar,
            footerComponent
        }
    }
</script>

<style>
  @import './assets/css/app.css';
  @import './assets/css/design.css';
  @import './assets/css/loading.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
</style>
