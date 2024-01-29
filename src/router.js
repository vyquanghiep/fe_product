import { createRouter, createWebHistory } from "vue-router";

import LoginForm from "@/components/LoginForm.vue";
import HomePage from "@/components/pages/HomePage.vue";
import CartProduct from "@/components/pages/CartProduct.vue";
import ProductDetail from "@/components/pages/ProductDetails.vue";
import ListProduct from "@/components/admin/product/ListProduct.vue";
import AddUser from "@/components/admin/user/AddUser.vue";
import ListUser from "@/components/admin/user/ListUser.vue";
import AddProduct from "@/components/admin/product/AddProduct.vue";


const routes = [
    {
        path: '/',
        name:'HomePage',
        component: HomePage
    },
    {   path: '/homepage/:id',
        name: ' HomepageWithId',
        component: HomePage,
        props: true,
    },

    {
        path: '/product/detail/:id',
        name:'ProductDetails',
        component: ProductDetail
    },
    {
        path: '/cart',
        name:'CartProduct',
        component: CartProduct
    },
    {
        path: '/login',
        name:'LoginForm ',
        component: LoginForm
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