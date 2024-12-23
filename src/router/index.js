import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/HomeView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/orders',
        component: () => import('../views/OrdersView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/reviews',
        component: () => import('../views/ReviewsView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/statistics',
        component: () => import('../views/StatisticsView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/settings',
        component: () => import('../views/SettingsView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/vet-services',
        component: () => import('../views/VetServicesView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/users',
        component: () => import('../views/UsersView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/pets',
        component: () => import('../views/PetsView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/pets/:id',
        component: () => import('../views/PetView.vue'),
        meta: {
            layout: 'dashboard'
        }
    },
    {
        path: '/register',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/login',
        component: () => import('../views/LoginView.vue'),
        meta: {
            layout: 'auth'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
