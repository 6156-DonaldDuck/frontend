<template>
    <el-descriptions title="Google User Profile">
        <el-descriptions-item
            label="Name">
            {{ this.profile ? this.profile.name : "" }}
        </el-descriptions-item>
        <el-descriptions-item
            label="Email">
            {{ this.profile ? this.profile.email : "" }}
        </el-descriptions-item>
    </el-descriptions>
</template>
<script>
import axios from 'axios'
import configJson from '../config/config.json'
export default {
    name: 'Profile',
    data: function() {
        return {
            profile: null,
            windowObjectReference: null,
            previousUrl: ""
        }
    },
    props: {
        isLoggedIn: Boolean
    },
    watch: {
        // watch the updates on isLoggedIn
        isLoggedIn: function() {
            if (this.isLoggedIn) {
                this.getGoogleUserProfile()
            }
        }
    },
    methods: {
        getGoogleUserProfile() {
            axios.get(configJson.endpoint.users + '/api/v1/users/google/profile')
                 .then(this.getGoogleUserProfileSuccess)
                 .catch(this.getGoogleUserProfileError)
        },
        getGoogleUserProfileSuccess(res) {
            console.log(res.data)
            this.profile = res.data
        },
        getGoogleUserProfileError(error) {
            console.log(error.response)
            if (error.response && error.response.status === 401) { // unauthorized
                // TODO: redirect the user to the google login page
                console.log("Unauthorized")
                this.$notify.error({
                    title: 'Unauthorized',
                    message: "You're not logged in"
                })
                // login
                this.$emit('loginWithGoogle')
            }
        }
    },
    mounted() {
        this.getGoogleUserProfile()
    }
}
</script>
<style scoped>

</style>
