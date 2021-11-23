<template>
    <div class="login">
        <div class="login-container">
            <div class="container">
                <div class="desc">2Pointer3Acres Admin</div>
                <el-card>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
                        <el-form-item prop="email" label="Email">
                            <el-input v-model="loginForm.email" placeholder="Email" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="Password">
                            <el-input type="password" placeholder="password" v-model="loginForm.password" ></el-input>
                        </el-form-item>
                        <div class="btns">
                            <el-button type="primary" style="flex: 2" @click="submitUserLogin">Login</el-button>
                        </div>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>

    
</template>

<script>
    import axios from 'axios'
    import configJson from '../../config/config.json'
    export default {
        name: "Login",
        data: function () {
            return {
                email: "",
                password: "",
                loginForm: {
                    email: null,
                    password: null,
                },
                rules: {
                    email: [
                        { required: true, message: 'Please input your email', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input your password', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitUserLogin() {
                let loginUrl = configJson.endpoint.users + '/api/v1/authentication/login?' + 'email=' + this.loginForm.email + '&password=' + this.loginForm.password
                axios({
                    method: 'post',
                    url: loginUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        email: this.loginForm.email,
                        password: this.loginForm.password
                    }
                }).then(this.loginSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            loginSuccess(res) {
                console.log(res.data)
                this.$notify({
                    title: 'Login Success',
                    message: 'Hello, ' + res.data.username,
                    type: 'success'
                })
                // redirect to article list
                this.$router.push({ name: 'ArticleList' });

                // set state in vuex
                this.$store.commit('setIsLoggedIn', true)
                this.$store.commit('setUsername', res.data.username)
                this.$store.commit('setUserId', res.data.id)

                axios.interceptors.request.use(function (config) {
                    config.headers.Authorization = res.data.token;
                    return config;
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
        background: 	#696969;
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
        color: white;
    }
</style>
