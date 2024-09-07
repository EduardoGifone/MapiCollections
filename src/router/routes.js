const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "PendingCollectionPage",
        path: "",
        component: () => import("pages/PendingCollectionPage.vue"),
      },
      {
        name: "CreateCollectionPage",
        path: "crear",
        component: () => import("pages/CreateCollectionPage.vue"),
      },
      {
        name: "EditCollectionPage",
        path: "editar/:id",
        component: () => import("pages/EditCollectionPage.vue"),
        props: true,
      },
      {
        name: "CancelledCollectionPage",
        path: "cancelados",
        component: () => import("pages/CancelledCollectionPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
