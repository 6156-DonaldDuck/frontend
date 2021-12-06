<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>User Profile</span>
        </div>
        <el-descriptions title="My Profile" class="el-desc">
                <el-descriptions-item label="Name"> {{ this.profile.first_name + ' ' + this.profile.last_name }} </el-descriptions-item>
                <el-descriptions-item label="Email"> {{ this.profile.email }} </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="Address" class="el-desc">
                <el-descriptions-item label="Country Code"> {{ this.address.country_code}} </el-descriptions-item>
                <el-descriptions-item label="Region"> {{ this.address.region }} </el-descriptions-item>
                <el-descriptions-item label="City"> {{ this.address.city }} </el-descriptions-item>
                <el-descriptions-item label="Street Name 1"> {{ this.address.street_name_1 }} </el-descriptions-item>
                <el-descriptions-item label="Street Name 2"> {{ this.address.street_name_2 }} </el-descriptions-item>
        </el-descriptions>
        
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
                address: {
                    country_code: '',
                    region: '',
                    city: '',
                    street_name_1: '',
                    street_name_2: ''
                },
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
                axios.get(configJson.endpoint.users + '/api/v1/compositions/' + userId)
                    .then(this.getUserProfileSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getUserProfileSuccess(res) {
                console.log(res)
                this.profile = res.data.user
                this.address = res.data.address
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
            }
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
