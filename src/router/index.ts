import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/profile",
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/profile/TheProfile.vue"),
  },

  {
    path: "/posts",
    name: "posts",
    component: () => import("../pages/post/ThePosts.vue"),
  },

  {
    path: "/posts/:id",
    name: "post",
    component: () => import("../pages/post/PostDetail.vue"),
  },

  {
    path: "/:notFound(.*)",
    name: "notFound",
    component: () => import("../pages/NotFound.vue"),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  linkActiveClass: "active-nav-link",
  routes,
});
