<template>
    <div class="login">
        <div class="login-container">
            <div class="container">
                <div class="desc">Welcome to 2Pointer3Acres</div>
                <el-card>
                    <el-form label-width="0px">
                            <div class="btns">
                                <el-button type="primary" @click="loginWithGoogle" v-if="!this.$store.state.isLoggedIn">Login with Google</el-button>
                                <el-button style="flex: 2" @click="routeTo('Register')">Register</el-button>
                            </div>                        
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>


</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "Login",
        data: function () {
            return {
                windowObjectReference: null,
                previousUrl: null,
                name: "",
                email: ""
            }
        },
        methods: {
            loginWithGoogle() {
                // open new pop up window
                let name = 'Login with Google';
                window.removeEventListener('message', this.receiveMessage);
                // window features
                const strWindowFeatures =
                    'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
                if (this.windowObjectReference === null || this.windowObjectReference.closed) {
                    /* if the pointer to the window object in memory does not exist
                    or if such pointer exists but the window was closed */
                    console.log('opening new window')
                    this.windowObjectReference = window.open('about:blank', name, strWindowFeatures);
                } else if (this.previousUrl !== url) {
                    /* if the resource to load is different,
                    then we load it in the already opened secondary window and then
                    we bring such window back on top/in front of its parent window. */
                    this.windowObjectReference = window.open('about:blank', name, strWindowFeatures);
                    this.windowObjectReference.focus();
                } else {
                    /* else the window reference must exist and the window
                    is not closed; therefore, we can bring it back on top of any other
                    window with the focus() method. There would be no need to re-create
                    the window or to reload the referenced resource. */
                    this.windowObjectReference.focus();
                }

                // add the listener for receiving a message from the popup
                window.addEventListener('message', event => this.receiveMessage(event), false);

                this.getGoogleLoginUrl()
                    .then(this.fillPopupWindowUrl)
                    .catch(function (error) {
                        console.log(error)
                })
            },
            getGoogleLoginUrl() {
                return axios.get(configJson.endpoint.users + "/api/v1/login/google/url")
            },
            fillPopupWindowUrl(res) {
                let loginUrl = res.data;
                this.windowObjectReference.location.href = loginUrl
                // assign the previous URL
                this.previousUrl = loginUrl;
            },
            receiveMessage: function (e) {
                if (e.data.googleLogin) {
                    let apiCallbackUrl = configJson.endpoint.users + '/api/v1/login/google/callback';
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
            apiCallbackSuccess: function (res) {
                console.log('successfully logged in, data=')
                console.log(res.data)
                let token = res.data.access_token
                let userId = res.data.user_id

                // set state in vuex
                this.$store.commit('setIsLoggedIn', true)
                this.$store.commit('setUserId', userId)

                // add authorization header to all following axios requests
                axios.interceptors.request.use(function (config) {
                    config.headers.Authorization = token;
                    return config;
                });
                this.getGoogleUserProfile()
            },
            getGoogleUserProfile: function () {
                axios.get(configJson.endpoint.users + '/api/v1/users/google/profile')
                    .then(this.getGoogleUserProfileSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            getGoogleUserProfileSuccess: function(res) {
                console.log(res.data)
                this.name = res.data.name
                this.email = res.data.email
                this.$store.commit('setUserEmail', this.email)
                this.$router.push({ name: 'Profile' });
                this.$notify({
                    title: 'Success',
                    message: 'Hello, Google User: ' + this.name,
                    type: 'success'
                });
            },
            routeTo(name) {
                this.$router.push({ name });
            },
        }
    }
</script>

<style>
    .validate-code .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: 0;
    }
</style>

<style scoped>
    .login {
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
    }
    .login-container {
        background: lightyellow;
        flex: 1;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 600px;
        max-width: 1000px;
        margin: auto;
    }
    .el-card {
        width: 320px;
    }
    .code {
        margin: 0 5px 0 10px;
    }
    .s-canvas {
        overflow: hidden;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
    }
    .btns {
        display: flex;
    }
    .desc {
        font-size: 30px;
        letter-spacing: 1px;
    }
</style>
