import { useNavigate } from "react-router-dom";
import useAuth from "./use-auth";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import { authAxios, publicAxios } from "@/api/baseAxios";

const useAxiosBase = () => {
  const { authUser, setAuthUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // choose which axios instance to use
  const axiosInstance = isAuthenticated ? authAxios : publicAxios;

  const handleErrorResponse = useCallback(
    (status: number, message?: string) => {
      const error = {
        message: message || "Session expired!",
        status,
      };

      if (status === 401 || status === 403) {
        toast.error(error.message);

        localStorage.removeItem("user");
        setAuthUser(null);
        navigate("/account/login");
      }

      return Promise.reject(error);
    },
    [navigate, setAuthUser]
  );

  const getRequest = async (url: string, params?: object) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(url, {
        params,
      });
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;

      if ([401, 403].includes(status)) {
        return handleErrorResponse(status, data?.message);
      }

      throw {
        message: data?.message || error.message,
        errors: data?.errors || null,
        status,
      };
    }
  };

  const postRequest = async (
    url: string,
    data: any,
    params?: any,
    isFormData = false
  ) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(url, data, {
        params,
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      const responseData = error.response?.data;

      throw {
        message: responseData?.message || error.message,
        errors: responseData?.errors || null,
        status: error.response?.status,
      };
    }
  };

  const putRequest = async (
    url: string,
    data: any,
    params?: any,
    isFormData = false
  ) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(url, data, {
        params,
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      const responseData = error.response?.data;

      throw {
        message: responseData?.message || error.message,
        errors: responseData?.errors || null,
        status: error.response?.status,
      };
    }
  };

  const deleteRequest = async (url: string, data?: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(url, { data });
      return response.data;
    } catch (error: any) {
      const responseData = error.response?.data;

      throw {
        message: responseData?.message || error.message,
        errors: responseData?.errors || null,
        status: error.response?.status,
      };
    }
  };

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Attach auth token
        if (isAuthenticated && authUser?.token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${authUser.token}`;
        }

        // VERY IMPORTANT: let Axios set multipart boundary
        if (config.data instanceof FormData) {
          delete config.headers["Content-Type"];
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, authUser, isAuthenticated, handleErrorResponse]);

  return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useAxiosBase;
