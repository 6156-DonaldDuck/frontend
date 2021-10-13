import MainLayout from '~/layouts/MainLayout'
import Comments from '~/components/Comment'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: '/comments',
            component: Comments
        }]
    }
]

export default routes
