<template>
    <footer class="footer" v-if="!hide">
        <div class="container giraffe">
            <div class="footer-mountain">
            </div>
        </div>
        <div class="main-footer">
            <div class="container">
                <div class="is-two-thirds">
                    <div class="footer-logo">
                        <ul>
                        <router-link :to="'/'">
                            <img src="../assets/images/Med_logo-w.png" style="height:50px">
                        </router-link>
                        </ul>
                        <ul class="footer-link">
                            <li style="float:right"><router-link :to="'/about'">About us</router-link></li>
                        </ul>
                </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data(){
            return {
                hide: false
            }
        },
        created(){
            this.setStyle(this.$route)
            this.$watch('$route', this.setStyle)
        },
        methods:{
            setStyle(route){
                this.transparent = false
                this.hide = false
                if(route.meta.footerstyle){
                    if(route.meta.footerstyle.hide){
                        this.hide = route.meta.footerstyle.hide
                    }
                }
            }
        }
    }
</script>
<style>
footer .giraffe {
  background-image: url('../assets/images/ful_giraffe.svg');
  background-repeat: no-repeat;
  height: 123px;
}
.footer{
    clear: both;
    /* position: absolute; */
    bottom: 0;
    width: 100%;
    padding: 0;
    bottom: -70px;
}
footer .main-footer .container {
  padding: 10px 0px;
}

footer .main-footer {
  background: #dddddd;
}

footer .footer-contain {
  padding: 18px 5px;
}

footer .footer-mountain {
  background-image: url('../assets/images/footer-mountain.svg');
  height: 100%;
  background-repeat: no-repeat;
  background-position: right bottom;
}

footer .footer-link li {
  font-size: 16px;
  list-style: none;
}

footer .footer-link li a {
  color: #000000;
}
</style>
