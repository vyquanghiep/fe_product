import { createRouter, createWebHistory } from "vue-router";

import Login_form from "@/components/LoginForm.vue";
import HomePage from "@/components/HomePage.vue";
import CartProduct from "@/components/CartProduct.vue";
import ListProduct from "@/components/product/ListProduct.vue";
import AddUser from "@/components/user/AddUser.vue";
import ListUser from "@/components/user/ListUser.vue";
import AddProduct from "@/components/product/AddProduct.vue";

const routes = [
    {
        path: '/homepage',
        name:'HomePage',
        component: HomePage
    },
    {
        path: '/cart',
        name:'CartProduct',
        component: CartProduct
    },
    {
        path: '/login',
        name:'Login_form',
        component: Login_form
    },
    {
        path: '/product',
        name:'ListProduct',
        component: ListProduct
    },
    {
        path: '/product/add',
        name:'AddProduct',
        component: AddProduct
    },
    {
        path: '/product/add/:id',
        name: 'addProduct',
        component: AddProduct,
        props: true,
    },

    {
        path: '/user',
        name:'ListUser',
        component: ListUser
    },

    {
        path: '/user/add',
        name:'AddUser',
        component: AddUser
    },
    {
        path: '/user/add/:id',
        name: 'addUser',
        component: AddUser,
        props: true,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;