import store from "../store";
import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../views/layouts/HomeLayout.vue";
import AdminLayout from "../views/layouts/AdminLayout.vue";

import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Dashboard from "../views/Dashboard.vue";
import ShopView from "../views/ShopView.vue"
import Tables from "../views/Tables.vue";
import ProductList from "../views/ProductList.vue";
import CategoryList from "../views/CategoryList.vue";
import OrderList from "../views/OrderList.vue";
import Profile from "../views/Profile.vue";
import NotFound from "../views/NotFound.vue";
import Signup from "../views/SignUp.vue";
import Signin from "../views/Signin.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      redirect: "/home",
      component: HomeLayout,
      children: [
        {
          path: "home",
          name: "Home",
          component: Home,
        },
        {
          path: "cart",
          name: "Cart",
          component: Cart,
        },
        {
          path: "checkout",
          name: "Checkout",
          component: Checkout,
        }
      ]
    },
    {
      path: "/admin",
      name: "/admin",
      redirect: '/admin/dashboard',
      component: AdminLayout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "shopview",
          name: "shopview",
          component: ShopView,
        },
        {
          path: "tables",
          name: "Tables",
          component: Tables,
        },
        {
          path: "productlist",
          name: "ProductList",
          component: ProductList,
        },
        {
          path: "categoryList",
          name: "CategoryList",
          component: CategoryList,
        },
        {
          path: "order",
          name: "OrderList",
          component: OrderList,
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: "signin",
          name: "Signin",
          meta: { isAuthPage: true },
          component: Signin,
        },
        {
          path: "signup",
          name: "Signup",
          meta: { isAuthPage: true },
          component: Signup,
        },
      ]
    },
    {
      path: "/sign-in",
      component: Signin,
    },
    {
      path: "/sign-up",
      component: Signup,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound
    }
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const isAdminAuth = store.state.isAdminAuth;
  // const isClientAuth = false;
  const isAuthPage = to.meta.isAuthPage;
  const toAdminRoute = to.path.split('/')[1] === 'admin';
  if (toAdminRoute && isAdminAuth && !isAuthPage) {
    next()
  } else if (toAdminRoute && !isAdminAuth && !isAuthPage) {
    next('/admin/signin')
  } else if (toAdminRoute && !isAdminAuth && isAuthPage) {
    next()
  } else {
    next()
  }
})

export default router;
