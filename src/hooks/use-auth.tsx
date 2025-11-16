import AuthenticationContext from "@/context/authentication-context";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export default useAuth;
