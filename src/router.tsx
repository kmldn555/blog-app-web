import { createBrowserRouter } from "react-router";
import { authLoader } from "./loaders/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: HomePage } = await import("./pages/HomePage");
      return { Component: HomePage };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: RegisterPage } = await import("./pages/RegisterPage");
      return { Component: RegisterPage };
    },
  },
  {
    path: "/login2",
    lazy: async () => {
      const { default: LoginPageDaniel } =
        await import("./pages/LoginPageDaniel");
      return { Component: LoginPageDaniel };
    },
  },
  {
    path: "/blogs/:slug",
    lazy: async () => {
      const { default: BlogDetail } = await import("./pages/BlogDetail");
      return { Component: BlogDetail };
    },
  },
  {
    path: "/write",
    lazy: async () => {
      const { default: CreateBlog } = await import("./pages/CreateBlog");
      return { Component: CreateBlog };
    },
    loader: authLoader,
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const { default: ForgotPassword } =
        await import("./pages/ForgotPassword");
      return { Component: ForgotPassword };
    },
  },
  {
    path: "/reset-password",
    lazy: async () => {
      const { default: ResetPassword } = await import("./pages/ResetPassword");
      return { Component: ResetPassword };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const { default: NotFound } = await import("./pages/NotFound");
      return { Component: NotFound };
    },
  },
]);
