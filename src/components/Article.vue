<template>
    <div>
        <el-table
            :data="articles"
            style="width: 100%">
            <el-table-column
                    prop="ID"
                    label="ID"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="author_id"
                    label="Author ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="Title"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="Content"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="kind"
                    label="Kind"
                    width="100">
            </el-table-column>
        </el-table>
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
        }
    },
    mounted() {
        axios.get(configJson.endpoint.articles + '/api/v1/articles')
            .then(this.listArticlesSuccess)
    }
}
</script>
