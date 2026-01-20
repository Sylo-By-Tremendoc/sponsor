import { createBrowserRouter } from "react-router-dom";
import { RedirectAuthUserGuard, RequireAuth } from "./require-auth";
import Error404 from "./pages/error404";
import Login from "./pages/auth/login";
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
import PublicLayout from "./pages/public";
import Profile from "./pages/private/profile";
import Plans from "./pages/private/packages-plans/plans";
import Messages from "./pages/private/messages";
import SecuritySettings from "./pages/private/settings/security";
import NotificationSettings from "./pages/private/settings/notification";
import ResetPassword from "./pages/auth/reset-password";
import PlanPaymentPage from "./pages/private/packages-plans/plans/make-payment";
import SingleBeneficiaryDetails from "./pages/private/beneficiaries/single-beneficiary-details";
import Blogs from "./pages/public/blogs";
import AboutUs from "./pages/public/about-us";
import HowItWorks from "./pages/public/how-it-works";
import FAQ from "./pages/public/faq";
import SingleBlogDetails from "./pages/public/blogs/single-blog-details";

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
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/how-it-works",
          element: <HowItWorks />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/blogs/:id",
          element: <SingleBlogDetails />,
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
              path: "/messages",
              element: <Messages />,
            },
            {
              path: "/support",
              element: <Support />,
            },
            {
              path: "/settings",
              children: [
                { path: "", element: <Settings /> },
                { path: "/settings/security", element: <SecuritySettings /> },
                {
                  path: "/settings/notification",
                  element: <NotificationSettings />,
                },
              ],
            },
            {
              path: "/profile",
              element: <Profile />,
            },
          ],
        },
        {
          path: "/package-plans/plans/:id",
          // element: <PlanPayment />,
          element: <PlanPaymentPage />,
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
