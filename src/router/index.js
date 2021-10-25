import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import ListadoProductos from '../views/Productos/ListadoProductos.vue';
import DetalleProducto from '../views/Productos/DetalleProducto.vue';

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/lista-productos',
        component: ListadoProductos
    },
    {
        path: '/lista-productos/:id',
        component: DetalleProducto
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router