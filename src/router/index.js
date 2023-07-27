import { createWebHistory, createRouter } from "vue-router";
import Home from "./../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/apiData",
    name: "About",
    component: () => import("./../views/ApiDataView.vue"), // lazy loading for large amount of data
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;