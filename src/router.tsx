import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/app/Dashboard";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

const RootRoute = createRootRoute({
  component: function Root() {
    return <Outlet />;
  },
});

// Auth routes
const AuthLayoutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth",
  component: function AuthShell() {
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    );
  },
});

const LoginRoute = createRoute({
  getParentRoute: () => AuthLayoutRoute,
  path: "login",
  component: Login,
});

const SignUpRoute = createRoute({
  getParentRoute: () => AuthLayoutRoute,
  path: "signup",
  component: SignUp,
});

// App routes
const AppLayoutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: function AppShell() {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  },
});

const DashboardRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: "dashboard",
  component: Dashboard,
});

const routeTree = RootRoute.addChildren([
  AuthLayoutRoute.addChildren([LoginRoute, SignUpRoute]),
  AppLayoutRoute.addChildren([DashboardRoute]),
]);

const router = createRouter({ routeTree });

export const AppRouter = () => <RouterProvider router={router} />;
