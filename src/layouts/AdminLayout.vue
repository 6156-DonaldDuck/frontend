<template>

    <el-container>
        <el-header>
                <el-row>
                    <el-col :span="20"><span>2 Point 3 Acres Admin Header</span></el-col>
                    <el-col :span="2" v-if="!this.$store.state.isLoggedIn">
                        <el-button type="primary" plain @click="this.toHome">Return</el-button>
                    </el-col>
                </el-row>
            </el-header>
        <el-container>
            <el-aside width="200px">
                    <el-col>
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                :router="true">
                            <el-menu-item index="/admin/articles">
                                <i class="el-icon-s-order"></i>
                                <span slot="title">Articles</span>
                            </el-menu-item>
                            <el-menu-item index="/admin/sections">
                                <i class="el-icon-s-grid"></i>
                                <span slot="title">Sections</span>
                            </el-menu-item>
                            <el-menu-item index="/admin/users">
                                <i class="el-icon-user-solid"></i>
                                <span slot="title">Users</span>
                            </el-menu-item>
                            <el-menu-item index="/admin/comments">
                                <i class="el-icon-s-comment"></i>
                                <span slot="title">Comments</span>
                            </el-menu-item>
                            
                        </el-menu>
                    </el-col>
                </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <Footer></Footer>
    </el-container>
    
</template>

<script>
import axios from 'axios'
import Footer from '../components/Footer.vue';
export default {
    name: 'MainLayout',
    components: {
        Footer
    },
    data: function() {
        return {
            windowObjectReference: null,
            previousUrl: null,
            isLoggedIn: false,
            userProfile: null,
        }
    },
    methods: {
        toHome() {
            this.$router.push("/")
        }
    }
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #409EFF;
        color: white;
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
