import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import User from '~/components/User'
import Article from '~/components/Article'
import Comment from '~/components/Comment'

const routes = [
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
        }]
    }
]

const router = new VueRouter({
    routes
})

export default router
