<template>
    <div>
    <navbar></navbar>
    <div id="classroom" style="min-height: 500px">
        <div class="page-header">
            <div class="container user-profile">
                <div>
                    <div class="col-md-2 col-xs-4">
                        <div class="profile-picture profile-picture-medium" v-bind:style="{'background-image': `url(${getUser.avatar_url})`}"></div>
                    </div>
                    <div class="col-md-10 col-xs-8 profile-detail">
                        <div class="row">
                            <div class="col-md-12 profile-info">
                                <div class="profile-name">
                                <router-link to="profile">
                                    <p>
                                    {{ getUser.name }}
                                    </p>
                                </router-link>
                                
                            </div>
                            <span class="username">@{{ getUser.username }}</span>
                            </div>
                        </div>
                        <div class="row hidden-xs">
                            <div class="col-xs-12">
                            <div class="profile-email">{{ getUser.email }}</div>
                                
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="container page-title">
                <h1>Your Classroom</h1>
                <router-link
                    to="classroom/create"
                    class="btn btn-default"
                    v-if="isTeacher"
                >Create class</router-link>
                <button class="btn btn-default" @click="showJoin">Join class</button>
            </div>
        </div>
        <classroom-join v-if="show_join"></classroom-join>
        <div class="container">
            <div class="classroom-list col-md-4" v-for="classroom in classrooms" v-bind:key="classroom">
                <div class="card">
                    <div class="classroom-background" v-bind:style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${classroom.cover_url})`}">
                    </div> 
                    <div class="classroom-list-head">
         .               <h3>
                        <router-link :to="'/classroom/'+classroom.id">{{ classroom.name }}</router-link> 
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2'
    import 'sweetalert2/dist/sweetalert2.min.css';
    import { mapGetters } from 'vuex'
    import navbar from './NavbarComponent.vue'

    export default {
        data(){
            return{
                classrooms: '',
                status: false,
                show_join: false,
                getUser: {
                    name: 'nhung',
                    usename: 'nhung',
                    email: 'a@gmail.com'
                }
            }       
        },
        components : {
            'navbar': navbar,
        },
    }
</script>