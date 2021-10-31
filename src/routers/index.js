import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import User from '~/components/User'
import Article from '~/components/Article'
import Comment from '~/components/Comment'
import Address from '~/components/Address'
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
            path: '/comments',
            component: Comment
        },{
            path: '/addresses',
            component: Address
        }]
    }
]

const router = new VueRouter({
    mode: 'history', // get rid of the # in the url
    routes
})

export default router
