import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@services/router";
import '@utils/i18n.js'
import { mockXHR } from '@mock'
import "./index.css";

if(import.meta.env.MODE === 'development'){
    mockXHR();
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<RouterProvider router={router} />);
