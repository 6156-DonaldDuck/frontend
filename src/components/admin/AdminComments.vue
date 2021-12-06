<template>
    <el-card shadow="never">
        <div style="text-align: left">
            <el-table :data="commentList">
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="author_id" label="Author ID"></el-table-column>
                <el-table-column  prop="article_id" label="Article ID"></el-table-column>
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
    name:'commentlist',
    data() {
      return {
        commentList: [],
        searchkey:""
      }
    },
    mounted(){
      axios.get(configJson.endpoint.comments + '/api/v1/comments')
            .then(this.listCommentsSuccess)
    },
    methods: {

      listCommentsSuccess(res) {
            console.log("successfully retrieved comments list")
            console.log(this.comments)
            this.commentList = res.data
      },
      deleteArticlesSuccess() {
            console.log("successfully delete comments list")
      },
      async handleDelete(index, row) {
        var _this = this;
        
         this.$confirm('This operation will permanently delete the comment, do you want to continue?', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.commentList.splice(index,1);
          axios.delete(configJson.endpoint.comments + '/api/v1/comments/'+row.ID)
            .then(this.deleteCommentSuccess)
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