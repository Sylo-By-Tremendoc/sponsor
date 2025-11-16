import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthenticationContext from "@/context/authentication-context";
import { toast } from "react-toastify";

const useLogin = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();
  const { setAuthUser } = useContext(AuthenticationContext);

  const login = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: (data) => postRequest("/auth/login", data),

    onSuccess: (response: any) => {
      const user = response?.data?.user;
      const token = response?.data?.token;

      if (user && token) {
        const authData = { user, token };
        localStorage.setItem("user", JSON.stringify(authData));

        setAuthUser(authData);

        toast.success("Login successful");
      }

      // Refresh any queries that depend on login
      queryClient.invalidateQueries({ queryKey: ["LOGIN"] });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    },
  });

  return login;
};

export default useLogin;
