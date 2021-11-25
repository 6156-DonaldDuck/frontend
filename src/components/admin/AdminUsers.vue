<template>
    <el-card shadow="never">
        <div>
            <el-input placeholder="Filter by ID" v-model="searchkey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchName()"></el-button>
            </el-input>
        </div>
        <div style="text-align: left">
            <el-table :data="userList">
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="first_name" label="First Name"></el-table-column>
                <el-table-column prop="last_name" label="Last Name"></el-table-column>
                <el-table-column  prop="email" label="Email"></el-table-column>
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
    name:'userlist',
    data() {
      return {
        userList: [],
        searchkey:""
      }
    },
    mounted(){
      axios.get(configJson.endpoint.users + '/api/v1/users')
            .then(this.listUsersSuccess)
    },
    methods: {

      listUsersSuccess(res) {
            console.log("successfully retrieved users list!")
            this.userList = res.data.users
      },
      deleteUsersSuccess() {
            console.log("successfully delete users list")
      },
      async handleDelete(index, row) {
        var _this = this;
        
         this.$confirm('This operation will permanently delete the user, do you want to continue?', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.userList.splice(index,1);
          axios.delete(configJson.endpoint.users + '/api/v1/users/'+row.id)
            .then(this.deleteUserSuccess)
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