import { authKey } from "@/constants/authKey";
import { getNewAccessToken } from "@/services/actions/authService";
import { IGenericErrorResponse, TResponseData } from "@/types";
import { getAccessToken, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getAccessToken(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responeData: TResponseData = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responeData;
  },
  async function (error) {
    // console.log(error);
    const config = error.config;
    // console.log(config);
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.errorMessages || [],
      };
      return responseObject;
    }
  }
);

export { instance };
