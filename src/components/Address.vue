<template>
    <div>
        <el-table
            :data="addresses"
            style="width: 100%">
            <el-table-column
                    prop="ID"
                    label="ID"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="street_number"
                    label="Street Number"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="street_name_1"
                    label="Street Name Line 1"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="street_name_2"
                    label="Street Name Line 1"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="City"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="region"
                    label="Region"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="country_code"
                    label="Country Code"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="postal_code"
                    label="Postal Code"
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
import configJson from '../config/config.json';

export default {
    name: 'Address',
    data() {
        return {
            addresses: [],
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        listAddresses() {
            axios.get(configJson.endpoint.users + '/api/v1/addresses?page=' + this.page + '&page_size=' + this.pageSize)
                .then(this.listAddressesSuccess)
        },
        listAddressesSuccess(res) {
            this.addresses = res.data.addresses
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
        this.listAddresses()
    }
}
</script>
