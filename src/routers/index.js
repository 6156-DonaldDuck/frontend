import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import User from '~/components/User'
import Article from '~/components/article/Article'
import ArticleDetail from '~/components/article/ArticleDetail'
import ArticleEdit from '~/components/article/ArticleEdit'
import Comment from '~/components/Comment'
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
            path: '/comments',
            component: Comment
        },{
            path: '/addresses',
            component: Address
        },{
            path: '/profile',
            component: Profile
        }]
    }
]

const router = new VueRouter({
    mode: 'history', // get rid of the # in the url
    routes
})

export default router
