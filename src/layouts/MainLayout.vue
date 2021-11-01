<template>
    <el-container>
        <el-aside width="200px">
            <el-col>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :router="true">
                    <el-menu-item index="/articles">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Articles</span>
                    </el-menu-item>
                    <el-menu-item index="/users">
                        <i class="el-icon-document"></i>
                        <span slot="title">Users</span>
                    </el-menu-item>
                    <el-menu-item index="/comments">
                        <i class="el-icon-setting"></i>
                        <span slot="title">Comments</span>
                    </el-menu-item>
                    <el-menu-item index="/addresses">
                        <i class="el-icon-document"></i>
                        <span slot="title">Addresses</span>
                    </el-menu-item>
                    <el-menu-item index="/profile">
                        <i class="el-icon-document"></i>
                        <span slot="title">Google Profile</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-container>
            <el-header style="text-align: right">
                <el-button @click="getGoogleLoginUrl">Login with Google</el-button>
            </el-header>
            <el-main>
                <router-view @loginWithGoogle="this.loginWithGoogle" v-bind:isLoggedIn="this.isLoggedIn"></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MainLayout',
    data: function() {
        return {
            windowObjectReference: null,
            previousUrl: null,
            isLoggedIn: false,
            userProfile: null,
        }
    },
    watch: {
        isLoggedIn: function(val) {
            if (this.isLoggedIn) {
                this.getGoogleUserProfile()
            }
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
            return axios.get("http://localhost:8080/api/v1/login/google/url")
        },
        fillPopupWindowUrl(res) {
            let loginUrl = res.data;
            this.windowObjectReference.location.href = loginUrl
            // assign the previous URL
            this.previousUrl = loginUrl;
        },
        receiveMessage: function (e) {
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
        apiCallbackSuccess: function (res) {
            console.log('successully logged in, token=' + res.data)
            localStorage.setItem('access_token', res.data)
            axios.interceptors.request.use(function (config) {
                const token = res.data;
                config.headers.Authorization =  token;

                return config;
            });
            this.isLoggedIn = true
        },
        getGoogleUserProfile: function () {
            axios.get('http://localhost:8080/api/v1/users/google/profile')
                .then(this.getGoogleUserProfileSuccess)
                .catch(function (error) {
                    console.log(error)
                })
        },
        getGoogleUserProfileSuccess: function(res) {
            console.log(res.data)
            this.userProfile = res.data
            this.$notify({
                title: 'Success',
                message: 'Hello, Google User: ' + this.userProfile.name,
                type: 'success'
            });
        }
    }
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #409EFF;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>
