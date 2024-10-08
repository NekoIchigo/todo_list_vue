import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/private/UserManagementView.vue";
import TodoView from "@/views/private/TodoView.vue";
import PrivateView from "@/views/private/PrivateView.vue";
import LoginView from "@/views/public/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/app",
      name: "private",
      component: PrivateView,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/todo",
          name: "todo",
          component: TodoView,
        },
      ],
    },
  ],
});

export default router;
