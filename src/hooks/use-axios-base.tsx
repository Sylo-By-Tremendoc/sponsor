import { useNavigate } from "react-router-dom";
import useAuth from "./use-auth";
import baseAxios from "@/api/baseAxios";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";

const useAxiosBase = () => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleErrorResponse = useCallback(
    (status: number, message?: string) => {
      if (status === 401 || status === 403) {
        toast.error(message || "Session expired!");
        sessionStorage.removeItem("user");
        setAuthUser(null);
        navigate("/account/login");
      }
      return Promise.reject(message || "An error occurred");
    },
    [navigate, setAuthUser]
  );

  const getRequest = async (url: string, params?: object) => {
    try {
      const response: AxiosResponse<any> = await baseAxios.get(url, params);

      if ([401, 403].includes(response.status)) {
        return handleErrorResponse(response.status);
      }

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.value?.message || error.message;
      if (status && [401, 403].includes(status)) {
        return handleErrorResponse(status, message);
      }
      throw new Error(message);
    }
  };

  const postRequest = async (url: string, data: any, params?: any) => {
    try {
      const response: AxiosResponse = await baseAxios.post(url, data, {
        params,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.value?.message || error.message;
      const data = error.response?.data?.value?.value || null;

      throw {
        message,
        data,
      };
    }
  };

  const putRequest = async (url: string, data: any, params?: any) => {
    try {
      const response: AxiosResponse = await baseAxios.put(url, data, {
        params,
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.value?.message || error.message);
    }
  };

  const deleteRequest = async (url: string, data?: any) => {
    try {
      const response: AxiosResponse = await baseAxios.delete(url, { data });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.value?.message || error.message);
    }
  };

  useEffect(() => {
    const requestInterceptor = baseAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authUser?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = baseAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // if ([401, 403].includes(error?.response?.status))
        //   return handleErrorResponse(error.response.status);
        // return error;
        const status = error?.response?.status;
        if ([401, 403].includes(status)) {
          return handleErrorResponse(
            status,
            error.response?.data?.value?.message
          );
        }
        return Promise.reject(error);
      }
    );

    return () => {
      baseAxios.interceptors.request.eject(requestInterceptor);
      baseAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [authUser, handleErrorResponse]);

  return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useAxiosBase;
