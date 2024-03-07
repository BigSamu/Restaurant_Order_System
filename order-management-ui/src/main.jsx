import React from "react";
import ReactDOM from "react-dom/client";

import { OrderProvider } from "./contexts/OrderContext.jsx";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <OrderProvider>
    <App />
  </OrderProvider>
);
