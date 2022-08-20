import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView  from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import CreatePostView from "../views/CreatePostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/create-post",
      name: "create-post",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreatePostView,
    },
  ],
});

// router.beforeEach((to, from) => {
//   if (
//     // make sure the user is authenticated
//     userStore.isUserLoggedIn &&
//     // ❗️ Avoid an infinite redirect
//     to.name == 'login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'login' }
//   }
// })

export default router;
