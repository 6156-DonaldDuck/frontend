<template>
    <div>
        <el-table
            :data="users"
            style="width: 100%">
            <el-table-column
                    prop="ID"
                    label="ID"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="first_name"
                    label="First Name"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="last_name"
                    label="Last Name"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="phone_number"
                    label="Phone Number"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="e-mail"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="address_id"
                    label="Address"
                    width="100">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
import configJson from '../config/config.json'

export default {
    name: 'User',
    data() {
        return {
            users: []
        }
    },
    methods: {
        listUsersSuccess(res) {
            console.log("successfully retrieved comments list")
            console.log(this.users)
            this.users = res.data
        }
    },
    mounted() {
        axios.get(configJson.endpoint.users + '/api/v1/users')
            .then(this.listUsersSuccess)
    }
}
</script>
