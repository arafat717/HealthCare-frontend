import { authKey } from "@/constants/authKey";
import { instance } from "@/helpers/axios/axiosInstance";
import { decodeJwt } from "@/utils/jwt";
import {
  getAccessToken,
  removeAccessToken,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getAccessToken(authKey);
  if (authToken) {
    const decodedData: any = decodeJwt(authToken);
    return {
      ...decodedData,
      role: decodedData.role.toLowerCase(),
    };
  }
};

export const removeUser = () => {
  return removeAccessToken(authKey);
};

export const isLoggedIn = () => {
  const authToken = getAccessToken(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const getNewAccessToken = async () => {
  return await instance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
