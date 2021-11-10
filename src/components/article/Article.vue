<template>
    <div>
        <el-tabs type="border-card" v-model="activeSectionId" @tab-click="tabClick">
            <el-tab-pane
                    v-for="section in sections"
                    :label="section.title"
                    :name="section.ID.toString()">
                <el-card
                        v-for="article in articles"
                        :key="article.id"
                        shadow="hover"
                        :body-style="{ padding: '0px' }"
                        style="margin: 13px auto auto; width: 80%;"
                        @click.native="goToArticleDetailPage(article.ID)">
                    <div slot="header">{{ article.title }}</div>
                    <el-row style="margin: 10px auto;">
                        <el-col :span="12" style="text-align: left; padding-left: 20px">{{article.author_id}}</el-col>
                        <el-col :span="12" style="text-align: right; padding-right: 20px">{{getDateString(new Date(article.CreatedAt))}}</el-col>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="this.page"
                    @current-change="this.onPageChange"
                    :page-size="this.pageSize"
                    :total="this.total"
                    style="margin-top: 20px">
            </el-pagination>
        </el-tabs>
    </div>
</template>
<script>
    import axios from 'axios';
    import configJson from '../../config/config.json';

    export default {
        name: 'Article',
        data() {
            return {
                sections: [],
                articles: [],
                activeSectionId: "1",
                page: 1,
                pageSize: 10,
                total: 0
            }
        },
        methods: {
            tabClick() {
                this.listArticlesOfSection(this.activeSectionId)
            },
            onPageChange(page) {
                this.page = page
                this.listArticlesOfSection(this.activeSectionId)
            },
            listArticlesOfSection(sectionId) {
                // page is 0-indexed, so this.page - 1
                let url = configJson.endpoint.articles + '/api/v1/articles?page=' + (this.page - 1) + '&limit=' + this.pageSize
                if (sectionId !== "") {
                    url += '&section_id=' + sectionId
                }
                axios.get(url)
                    .then(this.listArticlesSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            listArticlesSuccess(res) {
                console.log('list articles result:')
                console.log(res.data)
                this.articles = res.data.articles
                this.total = res.data.total
            },
            listSections() {
                axios.get(configJson.endpoint.sections + '/api/v1/sections')
                    .then(this.listSectionsSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            listSectionsSuccess(res) {
                this.sections = res.data
                console.log(this.sections)
                if (this.sections.length > 0) {
                    this.activeSectionId = this.sections[0].ID.toString()
                    this.listArticlesOfSection(this.activeSectionId)
                }
            },
            goToArticleDetailPage(id) {
                this.$router.push('/articles/' + id)
            },
            getDateString(date) {
                if (!date) {
                    return ""
                }
                return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            }
        },
        mounted() {
            this.listSections()
        }
    }
</script>
