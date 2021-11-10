<template>
    <el-card style="margin: auto; width: 80%;">
        <div slot="header">
            <h2>{{ article.title }}</h2>
            <div style="text-align: right">
                Created At: {{ getDateString(new Date(article.CreatedAt)) }}
                <!--                <el-divider direction="vertical"></el-divider>-->
                <!--                Last Updated At: {{ getDateString(article.updated_at) }}-->
            </div>
        </div>
        <div>
            <v-md-preview :text="article.content" style="text-align: left"></v-md-preview>
        </div>
        <el-divider></el-divider>
        <div class="section">
            <h3>Comments</h3>
            <div v-if="comments.length > 0" v-for="comment in comments">
                <el-row style="margin-bottom: 5px">
                    <el-col :span="20">
                        <h4 style="margin: 0;">{{comment.author_id}}</h4>
                    </el-col>
                    <el-col :span="4" style="text-align: right">
                        <span>{{getDateString(new Date(comment.CreatedAt))}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    {{ comment.content }}
                </el-row>
                <el-divider></el-divider>
            </div>
        </div>
        <div v-if="this.$store.state.isLoggedIn">
            <div class="section">
                <h3>Add your comment</h3>
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="Leave your comment here"
                        v-model="newComment">

                </el-input>
            </div>
            <div style="text-align: right; margin-top: 10px">
                <el-button type="success" plain @click="submitComment">Submit</el-button>
            </div>
        </div>
        <div v-else>
            <div class="section">
                <h3>To leave your comment, you must login first</h3>
            </div>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios'
    import configJson from '../../config/config.json'
    export default {
        name: "ArticleDetail",
        data: function () {
            return {
                articleId: "",
                article: {
                    title: "",
                    section_id: 0,
                    content: "",
                    CreatedAt: new Date()
                },
                comments: [{
                    author_id: 1,
                    article_id: this.articleId,
                    content: "test1",
                    CreatedAt: new Date(),
                    UpdatedAt: new Date()
                },{
                    author_id: 1,
                    article_id: this.articleId,
                    content: "test2",
                    CreatedAt: new Date(),
                    UpdatedAt: new Date()
                }],
                newComment: ""
            }
        },
        methods: {
            getArticleDetail: function (id) {
                console.log('retrieving article id=' + id)
                axios.get(configJson.endpoint.articles + '/api/v1/articles/' + id)
                    .then(this.getArticleDetailSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            getArticleDetailSuccess: function (res) {
                console.log(res.data)
                if (res.data) {
                    this.article = res.data
                    this.getCommentsOfArticle()
                }
            },
            getCommentsOfArticle() {
                let url = configJson.endpoint.comments + '/api/v1/comments?article_id=' + this.article.ID
                axios.get(url)
                    .then(this.getCommentsOfArticleSuccess)
            },
            getCommentsOfArticleSuccess(res) {
                console.log("getting comments of the article")
                console.log(res.data)
                this.comments = res.data
            },
            submitComment() {
                let url = configJson.endpoint.comments + '/api/v1/comments'
                axios({
                    method: 'post',
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        content: this.newComment,
                        article_id: this.articleId,
                        author_id: this.$store.state.userId
                    }
                }).then(this.submitCommentSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            submitCommentSuccess(res) {
                console.log(res.data)
                // reload comment list
                this.getCommentsOfArticle()
            },
            getDateString(date) {
                if (!date) {
                    return ""
                }
                return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            }
        },
        mounted() {
            this.articleId = this.$route.params.id
            this.getArticleDetail(this.articleId)
        }
    }
</script>

<style scoped>
    .section {
        text-align: left;
    }
</style>
