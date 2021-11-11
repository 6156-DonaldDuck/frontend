
<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ this.isCreate ? "New Article" : "Edit Article" }}</span>
        </div>
        <div>
            <el-form ref="form" :model="article" label-width="80px">
                <el-form-item label="Title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="Section">
                    <el-select v-model="article.section_id" placeholder="Section" style="width: 100%">
                        <el-option v-for="section in sections" :label="section.title" :value="section.ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Content">
                    <v-md-editor v-model="article.content" height="400px" style="text-align: left"></v-md-editor>
                </el-form-item>
            </el-form>
        </div>
        <el-divider></el-divider>
        <div style="text-align: right">
            <el-button type="danger" plain @click="discardEdit">Discard</el-button>
            <el-button type="success" plain @click="submitArticle">Submit</el-button>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios'
    import configJson from '../../config/config.json'
    export default {
        name: "ArticleEdit",
        data: function () {
            return {
                articleId: null,
                isCreate: false,
                sections: [],
                article: {
                    title: "",
                    section_id: 1,
                    content: "",
                }
            }
        },
        methods: {
            listSections() {
                axios.get(configJson.endpoint.sections + '/api/v1/sections')
                    .then(this.listSectionsSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getArticleData() {
                axios.get(configJson.endpoint.articles + '/api/v1/articles/' + this.articleId)
                    .then(this.getArticleDataSuccess)
                    .catch(function () {
                        console.log(error)
                    })
            },
            getArticleDataSuccess(res) {
                console.log(res.data)
                this.article = res.data
            },
            listSectionsSuccess(res) {
                console.log(res.data)
                this.sections = res.data
                this.article.section_id = this.sections[0].ID
            },
            discardEdit() {
                // back to the previous page
                this.$router.go(-1)
            },
            submitArticle() {
                if (this.isCreate) {
                    let url = configJson.endpoint.articles + '/api/v1/articles'
                    axios({
                        method: 'post',
                        url: url,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            title: this.article.title,
                            content: this.article.content,
                            section_id: this.article.section_id,
                            author_id: this.$store.state.userId
                        }
                    }).then(this.submitSuccess)
                        .catch(function (err) {
                            console.log(err)
                        })
                } else {
                    let url = configJson.endpoint.articles + '/api/v1/articles/' + this.articleId
                    axios.put(url, this.article)
                        .then(this.submitSuccess)
                        .catch(function (err) {
                            console.log(err)
                        })
                }
            },
            submitSuccess(res) {
                console.log(res)
                this.$notify({
                    title: 'Success',
                    type: 'success'
                });
                this.$router.go(-1)
            }
        },
        mounted() {
            this.listSections()
            let articleId = this.$route.params.id
            console.log(articleId)
            if (articleId == null || articleId === "") { // create new article
                console.log("is create page")
                this.isCreate = true
            } else { // edit an existing article
                // get data for the article
                this.articleId = articleId
                this.getArticleData()
            }
        }
    }
</script>

<style scoped>
    .box-card {
        margin: auto;
        width: 80%;
    }
</style>
