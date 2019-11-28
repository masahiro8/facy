import Vue from "vue";
import VueRouter from "vue-router";
import Preview from "../views/Preview.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Shoot from "../views/PhotoShoot.vue";
import Select from "../views/Select.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/preview", name: "preview", component: Preview },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/photo-shoot",
    name: "shoot",
    component: Shoot
  },
  {
    path: "/select",
    name: "select",
    component: Select
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
