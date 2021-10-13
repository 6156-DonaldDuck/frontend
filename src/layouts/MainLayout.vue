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
                    <el-menu-item index="/users">
                        <i class="el-icon-document"></i>
                        <span slot="title">Users</span>
                    </el-menu-item>
                    <el-menu-item index="/comments">
                        <i class="el-icon-setting"></i>
                        <span slot="title">Comments</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'MainLayout'
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
        line-height: 160px;
        height: 500px;
    }
</style>
