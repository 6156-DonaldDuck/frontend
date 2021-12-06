<template>
    <el-card shadow="never">
        <div style="text-align: left">
            <el-table :data="articleList">
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="title" label="Title"></el-table-column>
                <el-table-column  prop="author_id" label="Author ID"></el-table-column>
                <el-table-column  prop="CreatedAt" label="Create At"></el-table-column>
                <el-table-column label="Operation" width="200px">
                    <template slot-scope="scope">
                        <el-row>
                        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
  import axios from 'axios'
  import configJson from '../../config/config.json'
  export default {
    name:'articlelist',
    data() {
      return {
        articleList: [],
        searchkey:""
      }
    },
    mounted(){
      axios.get(configJson.endpoint.articles + '/api/v1/articles')
            .then(this.listArticlesSuccess)
    },
    methods: {

      listArticlesSuccess(res) {
            console.log("successfully retrieved articles list")
            console.log(res.data)
            this.articleList = res.data.articles
      },
      deleteArticlesSuccess() {
            console.log("successfully delete articles list")
      },
      async handleDelete(index, row) {
        var _this = this;
        
         this.$confirm('This operation will permanently delete the article, do you want to continue?', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.articleList.splice(index,1);
          axios.delete(configJson.endpoint.articles + '/api/v1/articles/'+row.ID)
            .then(this.deleteArticlesSuccess)
          console.log('success')
          this.$message({
            type: 'success',
            message: 'Deleted Successfully!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled'
          });          
        });

      }
    }
  }
</script>

<style>
</style>