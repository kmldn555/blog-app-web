import { createBrowserRouter } from "react-router";
import { authLoader } from "./loaders/auth";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import HomePage from "./pages/HomePage";
import LoginPageDaniel from "./pages/LoginPageDaniel";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  {
    path: "/login2",
    element: <LoginPageDaniel />,
  },
  {
    path: "/blogs/:slug",
    element: <BlogDetail />,
  },
  {
    path: "/write",
    element: <CreateBlog />,
    loader: authLoader,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
