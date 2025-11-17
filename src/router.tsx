import { createBrowserRouter } from "react-router-dom";
import { RedirectAuthUserGuard, RequireAuth } from "./require-auth";
import Error404 from "./pages/error404";
import Login from "./pages/auth/login";
import ResetPassword from "./pages/auth/reset-password";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import HomePage from "./pages/public/home";
import Pricing from "./pages/public/pricing";
import ContactUs from "./pages/public/contact-us";
import PrivateLayout from "./pages/private";
import Dashboard from "./pages/private/dashboard";
import Beneficiaries from "./pages/private/beneficiaries";
import PackagePlans from "./pages/private/packages-plans";
import Notifications from "./pages/private/notifications";
import Settings from "./pages/private/settings";
import Support from "./pages/private/support";
import SingleBeneficiaryDetails from "./pages/private/beneficiaries/SingleBeneficiaryDetails";
import PublicLayout from "./pages/public";
import Profile from "./pages/private/profile";
import Plans from "./pages/private/packages-plans/plans";
import PlanPayment from "./pages/private/packages-plans/plans/PlanPayment";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <PrivateLayout />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/beneficiaries",
              children: [
                { path: "", element: <Beneficiaries /> },
                {
                  path: "/beneficiaries/:id",
                  element: <SingleBeneficiaryDetails />,
                },
              ],
            },
            {
              path: "/package-plans",
              children: [
                { path: "", element: <PackagePlans /> },
                {
                  path: "/package-plans/plans",
                  element: <Plans />,
                },
              ],
            },
            {
              path: "/notifications",
              element: <Notifications />,
            },
            {
              path: "/support",
              element: <Support />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
          ],
        },
        {
          path: "/package-plans/plans/:id",
          element: <PlanPayment />,
        },
      ],
    },
    {
      path: "/account",
      element: <RedirectAuthUserGuard />,
      children: [
        {
          path: "/account/login",
          element: <Login />,
        },
        {
          path: "/account/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/account/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/account/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;
