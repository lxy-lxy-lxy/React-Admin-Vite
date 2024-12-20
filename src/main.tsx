import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@services/router";
import "@i18n/i18n.ts";
import { mockXHR } from "@mock/index";
import "./index.css";

if (["local", "development"].includes(import.meta.env.MODE)) {
  mockXHR();
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
