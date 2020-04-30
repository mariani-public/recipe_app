import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cocktail/:id",
    name: "cocktail",
    component: () =>
      import(/* webpackChunkName: "cocktail" */ "../views/CocktailPage.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
