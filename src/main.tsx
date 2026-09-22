import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LoginPageDaniel from "./pages/LoginPageDaniel";
import HomePage from "./pages/HomePage";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import { authLoader } from "./loaders/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login2",
    element: <LoginPageDaniel />,
  },
  {
    path: "/blogs/:objectId",
    element: <BlogDetail />,
  },
  {
    path: "/write",
    element: <CreateBlog />,
    loader: authLoader,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
