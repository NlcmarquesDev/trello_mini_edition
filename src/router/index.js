import { createRouter, createWebHistory } from "vue-router";
import startView from "@/views/startView";
import boardDetail from "@/views/boardDetail";

const routes = [
  {
    path: "/",
    name: "Home",
    component: startView,
  },
  {
    path: "/:name",
    name: "boardDetail",
    component: boardDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
