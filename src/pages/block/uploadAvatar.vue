<template>
    <vue-clip 
        :options="options"
        :on-complete="uploadComplete"
    >
        <template slot="clip-uploader-action">
            <div class="profile-upload-overlay">
                <div class="dz-message">
                    <span>Change avatar</span>
                </div>
            </div>
        </template>
    </vue-clip>
</template>

<script>
import Vue from 'vue'
import VueClip from 'vue-clip'
 
Vue.use(VueClip)
    export default {
        props: ['callback'],
        data() {
            return {
                options: {
                    url: this.callback,
                    paramName: 'file',
                    required: ['image/*'],
                }
            }
        },
        methods:{
            uploadComplete(file, status, xhr){
                var avatar = JSON.parse(xhr.response).avatar
                this.$emit('uploaded', avatar)
            }
        }
    }
</script>