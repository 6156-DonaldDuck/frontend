<template>
    <el-container>
        <el-aside width="200px">
            <el-col>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :router="true">
                    <el-menu-item index="/articles">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Articles</span>
                    </el-menu-item>
                    <el-menu-item index="/profile" v-if="this.$store.state.isLoggedIn">
                        <i class="el-icon-document"></i>
                        <span slot="title">Profile</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-container>
            <el-header style="text-align: right">
                <span v-if="this.$store.state.isLoggedIn">{{ this.$store.state.email }}</span>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>2 Point 3 Acres</el-footer>
        </el-container>
    </el-container>
</template>

<script>
    export default {
    name: 'MainLayout',
    data: function() {
        return {
            windowObjectReference: null,
            previousUrl: null,
            name: "",
            email: ""
        }
    },
    methods: {
    }
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #409EFF;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>
