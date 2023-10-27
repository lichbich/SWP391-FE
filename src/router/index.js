import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import ShopView from "../views/ShopView.vue"
import Tables from "../views/Tables.vue";
import ProductList from "../views/ProductList.vue";
import CategoryList from "../views/CategoryList.vue";
import OrderList from "../views/OrderList.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/SignUp.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/shopview",
    name: "shopview",
    component: ShopView,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/productlist",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/categoryList",
    name: "CategoryList",
    component: CategoryList,
  },
  {
    path: "/order",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
