import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useMemo, createContext } from "react";
import {Navigate} from "react-router-dom";



export const AxiosContext = createContext<AxiosInstance | null>(null);

export default function AxiosContextProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token")
  
    const axiosInstance = useMemo(() => {
      type HeaderType = {
        Authorization?: string;
        "Content-Type"?: string;
        Accept: string;
        // "school-Id"?: string;
      };
  
      const headers: HeaderType = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
  
      if (localToken) {
        headers.Authorization = `Bearer ${localToken}`;
        // const school_id = sessionStorage.getItem("school_id");
        // if (school_id) {
        //   headers["school-Id"] = school_id;
        // }
        // if ()
        // headers.Authorization = `Bearer ${authState.token}`;
      }
      const onResponse = (response: AxiosResponse): AxiosResponse => {
        // if (authState.isLoggedIn) setGetRefreshToken(() => true);
        return response;
      };
  
      const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
        if (error.response) {
          // const token = authState.token;
          // const decoded = jwt_decode(token) as any;
          // const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
          // Access Token was expired
          if (
            (error.response.status === 403 || error.response.status === 401)
            // (error.response.status === 403 || error.response.status === 401) &&
            // authState.isLoggedIn
          ) {
            localStorage.clear();
            Navigate({to: "/"});
            //   toast.error("You're not logged in");
            // let refToken = sessionStorage.getItem("refresh");
            // if(refToken) {
            //   console.log("in reftoken")
            //   const decoded = jwt_decode(refToken!) as any;
            //   const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
            //   if (!isExpired) {
            //     setGetRefreshToken(() => true);
            //   }
            // } else {
            //   setAuthState({
            //     user: null,
            //     token: "",
            //     isLoggedIn: false,
            //   });
            // //   toast.error("You're not logged in");
            // //   Navigate({to: "/"});
            // }
  
          }
        }
        return Promise.reject(error);
      };
  
      const ax = axios.create({
        //   baseURL: process.env.VITE_REACT_APP_API_URL,
        baseURL: import.meta.env.VITE_APP_REACT_APP_API_URL,
        headers,
      });
  
      ax.interceptors.response.use(onResponse, onResponseError);
      return ax;
    }, [localUser]);
  
    return (
      <AxiosContext.Provider value={axiosInstance}>
        {children}
      </AxiosContext.Provider>
    );
  }