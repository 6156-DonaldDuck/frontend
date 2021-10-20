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
    </div>
</template>
<script>
import axios from 'axios'
import configJson from '../config/config.json';

export default {
    name: 'Address',
    data() {
        return {
            addresses: []
        }
    },
    methods: {
        listAddressesSuccess(res) {
            console.log("successfully retrieved comments list")
            console.log(this.addresses)
            this.addresses = res.data
        }
    },
    mounted() {
        axios.get(configJson.endpoint.users + '/api/v1/addresses')
            .then(this.listAddressesSuccess)
    }
}
</script>
