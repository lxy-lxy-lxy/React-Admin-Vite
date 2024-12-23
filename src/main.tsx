import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@services/router";
import "@i18n/i18n.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />,
);
