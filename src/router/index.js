import { createRouter, createWebHistory } from "vue-router";
import middleware from "@/router/middleware";
import Home from "@/views/Home.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Category from "@/views/Category.vue";
import Search from "@/views/Search.vue";
import Checkout from "@/views/Checkout.vue";
import Order from "@/views/Order.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Orders from "@/views/Orders.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home page",
    },
  },

  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: "About Kingodmac",
    },
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
    },
    beforeEnter: middleware.guest,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Registration",
    },
    beforeEnter: middleware.guest,
  },

  {
    path: "/forgot-password",
    name: "forgot.password",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
    beforeEnter: middleware.guest,
  },

  {
    path: "/reset-password",
    name: "reset.password",
    component: ResetPassword,
    meta: {
      title: "reset Password",
    },
    beforeEnter: middleware.guest,
  },

  {
    path: "/orders",
    name: "orders",
    component: Orders,
    meta: {
      title: "Order List",
    },
    beforeEnter: middleware.auth,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "Profile Page",
    },
    beforeEnter: middleware.auth,
  },

  {
    path: "/category/:slug",
    name: "category",
    component: Category,
    props: true,
  },
  {
    path: "/product/:slug",
    name: "productDetails",
    component: ProductDetails,
    props: true,
  },
  {
    path: "/search/:query",
    name: "search",
    component: Search,
    props: true,
    meta: {
      title: "Search",
    },
  },

  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    props: true,
    meta: {
      title: "Checkout Order",
    },
  },

  {
    path: "/order/:orderNumber",
    name: "order",
    component: Order,
    props: true,
    meta: {
      title: "Payment Order",
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //process.env.BASE_URL
  routes,
});

router.beforeEach((to, from, next) => {
  let title = import.meta.env.VUE_APP_TITLE;
  if (to.meta.title) {
    title += ` - ${to.meta.title}`;
  }

  document.title = title;
  sessionStorage.prevUrl = JSON.stringify(from.fullPath);
  next();
});

export default router;
