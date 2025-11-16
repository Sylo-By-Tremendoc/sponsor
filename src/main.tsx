import router from "./router.tsx";
import { StrictMode } from "react";
import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthenticationProvider } from "./context/authentication-context.tsx";

import "./index.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 10 seconds

      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            draggable
            theme="light"
            className="z-999999!"
          />
        </AuthenticationProvider>
      </QueryClientProvider>
    </Theme>
  </StrictMode>
);
