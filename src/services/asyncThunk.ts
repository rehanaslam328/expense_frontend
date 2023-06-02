import { _instance } from "./axiosInstance";

interface params {
  method: "post" | "get" | "patch" | "put" | "delete";
  data: object;
  url: string;
  isJsonType: boolean;
  isAuth: boolean;
  headers: object;
}

export const axiosCall = async ({
  data = {},
  method = "get",
  url,
  isJsonType = true,
  headers = {},
}: Partial<params>) => {
  try {
    const response = await _instance({
      method,
      url,
      data,
      headers: {
        "Content-Type": isJsonType ? "application/json" : "multipart/form-data",
        ...headers,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response);
  }
};

export const apiCall = async (
  { data = {}, method = "get", url, isJsonType = true, isAuth = true }: Partial<params>,
  ThunkApi: any
) => {
  const { authReducer } = ThunkApi.getState();
  const headers = {
    ...(isAuth && {
      authorization: authReducer.token.access_token,
      organization: authReducer.organization_id,
    }),
  };
  return axiosCall({ data, method, url, isJsonType, isAuth, headers });
};
