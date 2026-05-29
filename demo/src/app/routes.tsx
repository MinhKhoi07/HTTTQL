import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Sales } from "./pages/Sales";
import { Inventory } from "./pages/Inventory";
import { Imports } from "./pages/Imports";
import { Dashboard } from "./pages/Dashboard";
import { Categories } from "./pages/Categories";
import { Products } from "./pages/Products";
import { Accounts } from "./pages/Accounts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Sales },
      { path: "dashboard", Component: Dashboard },
      { path: "categories", Component: Categories },
      { path: "products", Component: Products },
      { path: "inventory", Component: Inventory },
      { path: "imports", Component: Imports },
      { path: "accounts", Component: Accounts },
    ],
  },
]);
