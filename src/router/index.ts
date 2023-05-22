import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getCookie } from "@/helpers/cookie";
import { View } from "../common/constants";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/sign-in",
    name: View.Login,
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: View.Register,
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/profile",
    name: View.Profile,
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: View.NotFound,
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(getCookie("jwt"));

  switch (to.name) {
    case View.Register:
    case View.Login:
      if (!isAuthenticated) {
        next();
      } else {
        next({ name: View.Profile });
      }
      break;

    default:
      if (isAuthenticated) {
        next();
      } else {
        next({ name: View.Login });
      }
      break;
  }
});

export default router;
