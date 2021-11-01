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
export default {
    name: 'Profile',
    data: function() {
        return {
            profile: null,
            windowObjectReference: null,
            previousUrl: ""
        }
    },
    methods: {
        getGoogleUserProfile() {
            axios.get('http://localhost:8080/api/v1/users/google/profile')
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
                // this.getGoogleLoginUrl()
                this.$emit('loginWithGoogle')
            }
        },
        getGoogleLoginUrl() {
            axios.get("http://localhost:8080/api/v1/login/google/url")
                .then(this.popGoogleLoginWindow)
                .catch(function (error) {
                    console.log(error)
            })
        },
        popGoogleLoginWindow(res) {
            let loginUrl = res.data;
            let name = 'Login with Google';
            window.removeEventListener('message', this.receiveMessage);

            // window features
            const strWindowFeatures =
                'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

            if (this.windowObjectReference === null || this.windowObjectReference.closed) {
                /* if the pointer to the window object in memory does not exist
                 or if such pointer exists but the window was closed */
                this.windowObjectReference = window.open(loginUrl, name, strWindowFeatures);
                console.log("checkpoint1")
            } else if (this.previousUrl !== url) {
                /* if the resource to load is different,
                 then we load it in the already opened secondary window and then
                 we bring such window back on top/in front of its parent window. */
                this.windowObjectReference = window.open(loginUrl, name, strWindowFeatures);
                this.windowObjectReference.focus();
                console.log("checkpoint2")
            } else {
                /* else the window reference must exist and the window
                 is not closed; therefore, we can bring it back on top of any other
                 window with the focus() method. There would be no need to re-create
                 the window or to reload the referenced resource. */
                this.windowObjectReference.focus();
                console.log("checkpoint3")
            }

            // add the listener for receiving a message from the popup
            window.addEventListener('message', event => this.receiveMessage(event), false);
            // assign the previous URL
            this.previousUrl = loginUrl;
            console.log("this.windowObjectReference=", this.windowObjectReference)
        },
        receiveMessage(e) {
            if (e.data.googleLogin) {
                let apiCallbackUrl = 'http://localhost:8080/api/v1/login/google/callback';
                axios({
                    method: 'post',
                    url: apiCallbackUrl,
                    data: {
                        state: e.data.state,
                        code: e.data.code
                    }
                }).then(this.apiCallbackSuccess)
            }
        },
        apiCallbackSuccess(res) {
            console.log('successully logged in, token=' + res.data)
            localStorage.setItem('access_token', res.data)
            // set access_token to cookies
            this.$cookie.set('access_token', res.data)
            this.isLoggedIn = true
            this.getGoogleUserProfile()
        }
    },
    mounted() {
        this.getGoogleUserProfile()
    }
}
</script>
<style scoped>

</style>