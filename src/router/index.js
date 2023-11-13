import store from "../store";
import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../views/layouts/HomeLayout.vue";
import AdminLayout from "../views/layouts/AdminLayout.vue";

import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import ProductList from "../views/ProductList.vue";
import ProductBestSeller from "../views/ProductBestSeller.vue";
import CategoryList from "../views/CategoryList.vue";
import OrderList from "../views/OrderList.vue";
import Profile from "../views/Profile.vue";
import ChangePassword from "../views/ChangePassword.vue";
import UserProfile from "../views/UserProfile.vue";
import NotFound from "../views/NotFound.vue";
import Signup from "../views/SignUp.vue";
import Signin from "../views/Signin.vue";
import HomeSearch from "@/views/HomeSearch";

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
        },
        {
          path: "search",
          name: "search",
          component: HomeSearch,
        },
        {
          path: "profile",
          name: "profile",
          component: UserProfile,
        },
      ]
    },
    {
      path: "/admin",
      name: "/admin",
      redirect: '/admin/productlist',
      component: AdminLayout,
      children: [
        {
          path: "productlist",
          name: "ProductList",
          component: ProductList,
        },
        {
          path: "product-best-seller",
          name: "ProductBestSeller",
          component: ProductBestSeller,
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
          path: "change-password",
          name: "change-password",
          component: ChangePassword,
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
      meta: { isAuthPage: true },
    },
    {
      path: "/sign-up",
      component: Signup,
      meta: { isAuthPage: true },
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
  const isClientAuth = store.state.isClientAuth;
  const isAuthPage = to.meta.isAuthPage;
  const toAdminRoute = to.path.split('/')[1] === 'admin';

  if (toAdminRoute && isAdminAuth && !isAuthPage) {
    next()
  } else if (toAdminRoute && !isAdminAuth && !isAuthPage) {
    next('/admin/signin')
  } else if (toAdminRoute && !isAdminAuth && isAuthPage) {
    next()
  } else if (!toAdminRoute && isClientAuth && !isAuthPage) {
    next()
  } else if (!toAdminRoute && isClientAuth && isAuthPage) {
    next('/')
  } else {
    next()
  }
})

export default router;
