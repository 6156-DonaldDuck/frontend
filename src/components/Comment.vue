<template>
    <div>
        <el-table
            :data="comments"
            style="width: 100%">
            <el-table-column
                    prop="ID"
                    label="ID"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="article_id"
                    label="Article ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="author_id"
                    label="Author ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="Content"
                    width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import configJson from '../config/config.json'

export default {
    name: 'Comment',
    data() {
        return {
            comments: []
        }
    },
    methods: {
        listCommentsSuccess(res) {
            console.log("successfully retrieved comments list")
            console.log(this.comments)
            this.comments = res.data
        }
    },
    mounted() {
        axios.get(configJson.endpoint.comments + '/api/v1/comments')
            .then(this.listCommentsSuccess)
    }
}
</script>
