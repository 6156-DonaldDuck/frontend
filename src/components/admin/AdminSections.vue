<template>
  <div>
      <el-card shadow="never">
        <el-row :gutter="20">

          <el-col :span="2">
            <el-button type="primary" id="newRoom" class="button" @click="applyRoom()" plain>Create New Section</el-button>
          </el-col>
        </el-row>
          <div style="text-align: left">
              <el-table :data="sectionList">
                  <el-table-column prop="ID" label="ID"></el-table-column>
                  <el-table-column prop="title" label="Title"></el-table-column>
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
      <el-dialog title="Create New Section" :visible.sync="dialogVisible" width="30%">
          <el-form :model="form" :rules="rules" ref="form" label-width="50px">
              <el-form-item label="Title" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
          </el-form>
          <div>
              <el-button type="primary" @click="onSubmit('form')">Create</el-button>
              <el-button @click="onCancel('form')">Cancel</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import configJson from '../../config/config.json'
  export default {
    name:'sectionlist',
    data() {
      return {
        sectionList: [],
        searchkey:"",
        dialogVisible: false,
        form: {
          title: '',
        },
        rules: {
            title: [
                { required: true, message: 'Input new section title', trrgger: 'blur'}
            ]
        },
      }
    },
    mounted(){
      axios.get(configJson.endpoint.sections + '/api/v1/sections')
            .then(this.listSectionsSuccess)
    },
    methods: {

      listSectionsSuccess(res) {
            console.log("successfully retrieved sections list")
            this.sectionList = res.data
      },
      deleteSectionsSuccess() {
            console.log("successfully delete sections list")
      },
      async handleDelete(index, row) {
        var _this = this;
        
         this.$confirm('This operation will permanently delete the section, do you want to continue?', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.sectionList.splice(index,1);
          axios.delete(configJson.endpoint.sections + '/api/v1/sections/'+row.ID)
            .then(this.deleteSectionsSuccess)
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

      },
      onCancel(formName) {     
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
      },
      createSuccess(res) {
        console.log("successfully create a new section")
        console.log(res.data)
        axios.get(configJson.endpoint.sections + '/api/v1/sections')
            .then(this.listSectionsSuccess)
      },
      onSubmit(formName) {
        const createUrl = configJson.endpoint.sections + '/api/v1/sections'
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios({
                  method: 'post',
                  url: createUrl,
                  headers: {
                      "Content-Type": "application/json"
                  },
                  data: {
                      title: this.form.title,
                  }
              }).then(this.createSuccess)
                  .catch(function (error) {
                      console.log(error)
                  })
          this.dialogVisible = false;
          } else {
              this.$message({
              message: 'Input a valid title！',
              type: 'warning'
              })
              return false;
          }
          });
      },
      applyRoom(){
          this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
.tableHeader {
        display: flex;
    }
</style>