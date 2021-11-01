<template>
    <div>
        <h1>
            {{ article.title }}
        </h1>
        <p>
            {{ article.content }}
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "ArticleDetail",
        data: function () {
            return {
                article: null
            }
        },
        methods: {
            getArticleDetail: function (id) {
                console.log('retrieving article id=' + id)
                axios.get('http://localhost:5000/api/v1/articles/' + id)
                    .then(this.getArticleDetailSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            getArticleDetailSuccess: function (res) {
                console.log(res.data)
                if (res.data) {
                    this.article = res.data
                }
            }
        },
        mounted() {
            let articleId = this.$route.params.id
            this.getArticleDetail(articleId)
        }
    }
</script>

<style scoped>

</style>
