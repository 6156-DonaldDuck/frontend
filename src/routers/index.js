import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import AdminLayout from '~/layouts/AdminLayout'
import User from '~/components/User'
import Article from '~/components/article/Article'
import ArticleDetail from '~/components/article/ArticleDetail'
import ArticleEdit from '~/components/article/ArticleEdit'

import AdminLogin from '~/components/Admin/AdminLogin'
import AdminArticles from '~/components/Admin/AdminArticles'
import AdminComments from '~/components/Admin/AdminComments'
import AdminSections from '~/components/Admin/AdminSections'
import AdminUsers from '~/components/Admin/AdminUsers'

import Address from '~/components/Address'
import Profile from '~/components/Profile'
import GoogleLoginCallback from '~/components/GoogleLoginCallback'

const routes = [
    {
        path: '/google-login/callback',
        component: GoogleLoginCallback
    },
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: '/users',
            component: User
        },{
            path: '/articles',
            component: Article
        },{
            path: '/articles/edit/:id?',
            component: ArticleEdit
        },{
            path: '/articles/:id',
            component: ArticleDetail
        },{
            path: '/addresses',
            component: Address
        },{
            path: '/profile',
            component: Profile
        }]
    },
    {
        path: '/admin/',
        redirect: '/admin/login',
        component: AdminLayout,
        children: [{
            path: 'login',
            name: 'AdminLogin',
            component: AdminLogin
        },
        {
            path: 'articles',
            name: 'ArticleList',
            component: AdminArticles
        },
        {
            path: 'users',
            name: 'UserList',
            component: AdminUsers
        },
        {
            path: 'comments',
            name: 'CommentList',
            component: AdminComments
        },
        {
            path: 'sections',
            name: 'SectionList',
            component: AdminSections
        }]
    }
]

const router = new VueRouter({
    mode: 'history', // get rid of the # in the url
    routes
})

export default router
