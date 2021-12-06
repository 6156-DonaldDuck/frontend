<template>
    <div class="register">
        <div class="register-container">
            <div class="container">
                <el-card>
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item prop="first_name" label="FirstName">
                            <el-input v-model="form.first_name" placeholder="Input your first name"></el-input>
                        </el-form-item>
                        <el-form-item prop="last_name" label="LastName">
                            <el-input v-model="form.last_name" placeholder="Input your last name"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone_number" label="Phone">
                            <el-input v-model="form.phone_number" placeholder="Input your phone number"></el-input>
                        </el-form-item>
                         <el-form-item prop="email" label="Email">
                            <el-input v-model="form.email" placeholder="Input your education email"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="address" :model="address" label-width="80px">
                        <el-form-item prop="country_code" label="Country">
                            <el-input v-model="address.country_code"></el-input>
                        </el-form-item>
                         <el-form-item prop="region" label="Region">
                            <el-input v-model="address.region" ></el-input>
                        </el-form-item>
                        <el-form-item prop="city" label="City">
                            <el-input v-model="address.city" ></el-input>
                        </el-form-item>
                        <el-form-item prop="street_name_1" label="Street 1">
                            <el-input v-model="address.street_name_1" ></el-input>
                        </el-form-item>
                        <el-form-item prop="street_name_2" label="Street 2">
                            <el-input v-model="address.street_name_2"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="btns">
                                <el-button type="primary" @click="submitUserRegister('form')" style="flex: 2">Register</el-button>
                                <el-button @click="onCancel()" style="flex: 1">Already registered?</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div class="desc">2Point3Acres User Registration</div>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "Register",
        data: function () {
            var validateEmail = (rule, value, callback) => {
                const emailReg = /^[a-z0-9A-Z]+([-|_|\.]+[a-z0-9A-Z]+)*@([a-z0-9A-Z]+[-|\.])+edu$/
                if (value === '') {
                    callback(new Error('Input your educational email'));
                } else if (!emailReg.test(this.form.email)){
                    callback(new Error('Please input correct educational email'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    first_name: '',				
                    last_name: '',
                    phone_number: '',
                    email: '',
                },
                
                address: {
                    country_code: '',
                    region: '',
                    city: '',
                    street_name_1: '',
                    street_name_2: ''
                },

                rules: {
                    first_name: [
                        { required: true, message: 'Please input your first name', trigger: 'blur' }
                    ],
                    last_name: [
                        { required: true, message: 'Please input your last name', trigger: 'blur' }
                    ],
                    phone_number: [
                        { required: true, message: 'Please input your phone number', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: validateEmail, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitUserRegister(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let registerUrl = configJson.endpoint.users + '/api/v1/compositions'
                        axios({
                            method: 'post',
                            url: registerUrl,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: {
                                user: this.form,
                                address: this.address
                            }
                        }).then(this.registerSuccess)
                            .catch(function (error) {
                                console.log(error)
                            })
                    } else {
                        this.$notify({
                            title: 'Invalid',
                            message: 'Invalid Input',
                            type: 'error'
                        })
                        return false;
                    }
                });
            },
            registerSuccess(res) {
                console.log(res)
                this.$notify({
                    title: 'Register Success',
                    message: 'Redirect to login',
                    type: 'success'
                })
                this.$router.push({ name: 'Login' });
            },
            onCancel() {
			    this.$router.push({ name: 'Login' });
		    },
        }
    }
</script>

<style lang="scss" scoped>

    .register {
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
    }
    .register-container {
        background:lightcoral;
        flex: 1;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 900px;
        max-width: 1100px;
        margin: auto;
    }

	.el-card {
		width: 500px;
		padding-top: 40px;
	}
	.btns {
		display: flex;
		width: 60%;
	}
	.desc {
		font-size: 30px;
		letter-spacing: 1px;
		color: white;
	}
</style>
