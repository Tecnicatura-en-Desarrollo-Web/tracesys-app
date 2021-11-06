import { createRouter, createWebHistory } from '@ionic/vue-router';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '../store/index';
import ListadoProductos from '../views/Productos/ListadoProductos.vue';
import DetalleProducto from '../views/Productos/DetalleProducto.vue';
import AprobarProducto from '../views/Productos/AprobarProducto.vue';
import MensajesProducto from '../views/Productos/MensajesProducto.vue';

const routes = [{
        path: '/',
        redirect: '/login',
        meta: { requiredAuth: false },
    },
    // {
    //     path: '/home',
    //     name: 'Home',
    //     component: Home,
    //     meta: { requiredAuth: true },
    // },
    {
        path: '/login',
        component: Login,
        meta: { requiredAuth: false },
    },
    {
        path: '/lista-productos',
        component: ListadoProductos,
        meta: { requiredAuth: true },
    },
    {
        path: '/lista-productos/:id',
        component: DetalleProducto,
        meta: { requiredAuth: true },
    },
    {
        path: '/lista-productos/:id/aprobar',
        component: AprobarProducto,
        meta: { requiredAuth: true },
    },
    {
        path: '/lista-productos/:id/mensajes',
        component: MensajesProducto,
        meta: { requiredAuth: true },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

function guard(to, from, next, authData) {
    //comprueba los metadatos de las rutas y en base a ello se cambia si es necesario
    if (to.meta && to.meta.requiredAuth) {
        if (authData && authData.userId > 0) {
            return next();
        }
        return next({ path: "/login" });
    } else {
        if (authData && authData.userId > 0) {
            return next({ path: "/lista-productos" });
        }
        return next();
    }
}

router.beforeEach((to, from, next) => {
    //en los cambios de rutas recargamos los datos del usuario logueado
    let authData = store.getters["auth/getAuthData"];
    if (authData.userId == 0) {
        store.dispatch("auth/loadStorageTokens").then(() => {
                authData = store.getters["auth/getAuthData"];
                return guard(to, from, next, authData);
            },
            (error) => {
                console.log(error);
                return guard(to, from, next, authData);
            });
    } else {
        return guard(to, from, next, authData);
    }
})
export default router