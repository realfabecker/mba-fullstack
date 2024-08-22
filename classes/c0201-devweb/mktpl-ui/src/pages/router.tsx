import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./_layouts/AuthLayout.tsx";
import { SignIn } from "./auth/SignIn.tsx";
import { AppLayout } from "./_layouts/AppLayout.tsx";
import { Dashboard } from "./app/dashboard/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
