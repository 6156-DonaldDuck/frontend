<template>
    <div>
        <el-card
            v-for="article in this.articles"
            :key="article.ID"
            shadow="hover"
            :body-style="{ padding: '0px' }"
            style="margin: 13px auto auto; width: 80%;"
            @click.native="goToArticleDetailPage(article.ID)">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
                <span>{{ article.title }}</span>
                <div class="bottom clearfix">
                <time class="time">{{ article.CreatedAt }}</time>
                <el-button type="text" class="button">Blabla</el-button>
                </div>
            </div>
        </el-card>
        <el-pagination
            layout="prev, pager, next"
            :page-size="3"
            :total="50"
            style="margin-top: 20px">
        </el-pagination>
    </div>
</template>
<script>
import axios from 'axios'
import configJson from '../config/config.json';

export default {
    name: 'Article',
    data() {
        return {
            articles: []
        }
    },
    methods: {
        listArticlesSuccess(res) {
            console.log("successfully retrieved articles list")
            console.log(this.articles)
            this.articles = res.data
        },
        goToArticleDetailPage(id) {
            console.log('clicked on article ' + id)
            this.$router.push('/articles/' + id)
        }
    },
    mounted() {
        // axios.get(configJson.endpoint.articles + '/api/v1/articles')
        //     .then(this.listArticlesSuccess)
        axios.get('http://localhost:5000/api/v1/articles')
            .then(this.listArticlesSuccess)
    }
}
</script>

<style scoped>
    .image {
        width: 100%;
        display: block;
    }
</style>