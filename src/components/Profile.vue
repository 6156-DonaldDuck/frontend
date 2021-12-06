<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>User Profile</span>
        </div>
        <el-descriptions title="My Profile" class="el-desc">
                <el-descriptions-item label="Name"> {{ this.profile.first_name + ' ' + this.profile.last_name }} </el-descriptions-item>
                <el-descriptions-item label="Email"> {{ this.profile.email }} </el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-if="!addressIsNull" title="Address" class="el-desc">
                <el-descriptions-item label="Country Code"> {{ this.address.country_code}} </el-descriptions-item>
                <el-descriptions-item label="Region"> {{ this.address.region }} </el-descriptions-item>
                <el-descriptions-item label="City"> {{ this.address.city }} </el-descriptions-item>
                <el-descriptions-item label="Postal Code"> {{ this.address.postal_code }} </el-descriptions-item>
                <el-descriptions-item label="Street Name 1"> {{ this.address.street_name_1 }} </el-descriptions-item>
                <el-descriptions-item label="Street Name 2"> {{ this.address.street_name_2 }} </el-descriptions-item>
        </el-descriptions>
        <el-button v-if="addressIsNull" class="button" type="primary" plain size="mini" @click="this.openCreateDialog" >Add New Address</el-button>
        <el-button v-if="!addressIsNull" class="button" type="primary" plain size="mini" @click="this.openUpdateDialog" >Update Address</el-button>
        <el-divider></el-divider>
        <h3>My Articles</h3>
        <el-table :data="articles" style="width: 100%;">
            <el-table-column prop="title" min-width="250" label="Title"></el-table-column>
            <el-table-column prop="CreatedAt" min-width="130" label="Create Time"></el-table-column>
            <el-table-column prop="UpdatedAt" min-width="130" label="Update Time"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operation"
                    width="150">
                <template slot-scope="scope">
                    <el-button @click="clickView(scope.row.id)" type="text" size="small">View</el-button>
                    <el-button @click="clickEdit(scope.row.id)" type="text" size="small">Edit</el-button>
                    <el-button @click="clickDelete(scope.row.id)" type="text" size="small">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :current-page="this.page"
                @current-change="this.onPageChange"
                :page-size="this.pageSize"
                :total="this.total"
                style="margin-top: 20px">
        </el-pagination>
        <el-button type="success" plain @click="this.clickNewArticle" style="margin-top: 18px">New Article</el-button>
        <el-dialog :title="formTitle" :visible.sync="dialogVisible" width="40%">
            <el-form :model="address" ref="address" label-width="120px">
                <el-form-item label="Country Code" prop="country_code">
                    <el-input v-model="address.country_code"></el-input>
                </el-form-item>
                <el-form-item label="Region" prop="region">
                    <el-input v-model="address.region"></el-input>
                </el-form-item>
                <el-form-item label="City" prop="city">
                    <el-input v-model="address.city"></el-input>
                </el-form-item>
                <el-form-item label="Postal Code" prop="postal_code">
                    <el-input v-model="address.postal_code"></el-input>
                </el-form-item>
                <el-form-item label="Street Name 1" prop="street_name_1">
                    <el-input v-model="address.street_name_1"></el-input>
                </el-form-item>
                <el-form-item label="Street Name 2" prop="street_name_2">
                    <el-input v-model="address.street_name_2"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button v-if="addressIsNull" type="primary" @click="onCreateSubmit('address')">{{ this.formButton }}</el-button>
                <el-button v-if="!addressIsNull" type="primary" @click="onUpdateSubmit('address')">{{ this.formButton }}</el-button>
                <el-button @click="onCancel()">Cancel</el-button>
            </div>
        </el-dialog>
    </el-card>
    
</template>
<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: 'UserProfile',
        data: function () {
            return {
                profile: {
                    first_name: "test1",
                    last_name: "test2",
                    email: "email@columbia.edu",
                },
                formTitle: '',
                formButton: '',
                addressIsNull: true,
                address: {
                    ID: '',
                    country_code: '',
                    postal_code: '',
                    region: '',
                    city: '',
                    street_name_1: '',
                    street_name_2: '',
                    user_id: '',
                },
                dialogVisible: false,
                articles: [{
                    id: 2,
                    title: "test-1",
                    created_at: 1,
                    updated_at: 2
                }],
                page: 1,
                pageSize: 5,
                total: 0
            }
        },
        methods: {
            getUserProfile() {
                let userId = this.$store.state.userId
                axios.get(configJson.endpoint.compositions + '/api/v1/compositions/' + userId)
                    .then(this.getUserProfileSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getUserProfileSuccess(res) {
                console.log(res)
                this.profile = res.data.user
                this.address = res.data.address
                if (this.address.ID != 0) {
                    this.addressIsNull = false
                }
                console.log(this.address)
                this.listArticlesOfUser()
            },
            listArticlesOfUser() {
                let userId = this.$store.state.userId
                let url = configJson.endpoint.articles + '/api/v1/articles?page=' + this.page + '&page_size=' + this.pageSize
                    + '&author_id=' + userId
                axios.get(url)
                    .then(this.listArticlesOfUserSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            listArticlesOfUserSuccess(res) {
                console.log(res.data)
                this.articles = res.data.articles
                this.total = res.data.total
            },
            clickView(articleId) {
                this.$router.push('/articles/' + articleId)
            },
            clickEdit(articleId) {
                console.log('clicked on edit button for article ' + articleId)
                this.$router.push('/articles/edit/' + articleId)
            },
            clickDelete(articleId) {
                this.$confirm('Are you sure to delete this article?', 'Warning', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.delete(configJson.endpoint.articles + '/api/v1/articles/' + articleId)
                        .then(this.deleteArticleSuccess)
                        .catch(function (err) {
                            console.log(err)
                        })
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: 'Discarded'
                    });
                });

            },
            deleteArticleSuccess(res) {
                console.log(res)
                this.$notify({
                    type: 'success',
                    message: 'Successfully deleted'
                });
                // refresh the articles list
                this.listArticlesOfUser()
            },
            clickNewArticle() {
                this.$router.push('/articles/edit')
            },
            onPageChange(page) {
                this.page = page
                this.listArticlesOfSection(this.activeSectionId)
            },
            openCreateDialog(){
                this.formTitle = 'Create Address'
                this.formButton = "Create"
                this.dialogVisible = true
            },
            openUpdateDialog(){
                this.formTitle = 'Update Address'
                this.formButton = 'Update'
                this.dialogVisible = true
            },
            onCancel() {     
                this.dialogVisible = false;
                this.$refs['address'].resetFields();
            },
            onUpdateSubmit() {
                const updateUrl = configJson.endpoint.addresses + '/api/v1/addresses/' + this.address.ID
                axios({
                    method: 'put',
                    url: updateUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: this.address
                }).then(this.updateSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
                this.dialogVisible = false;
            },
            updateSuccess(res) {
                console.log("successfully update the address")
                console.log(res.data)
                this.$notify({
                    title: 'Success',
                    type: 'success',
                    message: 'Successfully Updated'
                });
            },
            onCreateSubmit() {
                const updateUrl = configJson.endpoint.addresses + '/api/v1/addresses'
                this.address.user_id = this.$store.state.userId
                axios({
                    method: 'post',
                    url: updateUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: this.address
                }).then(this.createSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
                this.dialogVisible = false;
            },
            createSuccess(res) {
                console.log("successfully create the address")
                console.log(res.data)
                this.$notify({
                    title: 'Success',
                    type: 'success',
                    message: 'Successfully Add New Address'
                });
                this.addressIsNull = false
            },
        },
        mounted: function () {
            this.getUserProfile()
        }
    }
</script>
<style scoped>
    .box-card {
        width: 80%;
        margin: auto;
    }
    .button { 
        display: flex;
        align-items: left;
        justify-content: space-between;
    }

    .el-desc {
        margin-top: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>
