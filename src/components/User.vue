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
        <el-pagination
                layout="prev, pager, next"
                :current-page="this.page"
                @current-change="this.onPageChange"
                :page-size="this.pageSize"
                :total="this.total"
                style="margin-top: 20px">
        </el-pagination>
    </div>
</template>
<script>
import axios from 'axios'
import configJson from '../config/config.json'

export default {
    name: 'User',
    data() {
        return {
            users: [],
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        listUsers() {
            axios.get(configJson.endpoint.users + '/api/v1/users?page=' + this.page + '&page_size=' + this.pageSize)
                .then(this.listUsersSuccess)
        },
        listUsersSuccess(res) {
            this.users = res.data.users
            this.page = res.data.page
            this.pageSize = res.data.pageSize
            this.total = res.data.total
        },
        onPageChange(page) {
            this.page = page
            this.listUsers()
        }
    },
    mounted() {
        this.listUsers()
    }
}
</script>
