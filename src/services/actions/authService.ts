import { authKey } from "@/constants/authKey";
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
