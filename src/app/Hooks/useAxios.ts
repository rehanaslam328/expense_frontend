/** @format */

import { Toast } from "app/shared";
import { axiosCall } from "services";
import { useBool } from "./useBoolean";
import { useGetTokens } from "./useGetTokens";
import { params, axiosResponse } from "./Types";
import { useTypedDispatch } from "store";
import { endpoints, routeNames } from "static";
import { useNavigate } from "react-router-dom";
import { Logout } from "store/slices/authSlice";
import { RESET_STATE_ACTION_TYPE } from "store/action/resetState";

const { LOGIN } = routeNames;
const { LOGOUT } = endpoints;

export const useAxios = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { bool, toggle } = useBool();
  const { access_token, organization_id } = useGetTokens();
  const callAxios = ({ method, data, url, isJsonType = true }: params) => {
    toggle();
    return axiosCall({
      method,
      data,
      url,
      isJsonType,
      headers: {
        authorization: access_token,
        organization: organization_id,
      },
    })
      .then((res: axiosResponse) => {
        toggle();
        return res;
      })
      .catch((error: any) => {
        if(error){
          toggle();
          const {
            status,
            data: { message },
          } = error;
          if (status === 401) {
            dispatch(Logout({ url: LOGOUT }))
              .unwrap()
              .then((res) => {
                if (res) {
                  dispatch({ type: RESET_STATE_ACTION_TYPE });
                  localStorage.clear();
                  navigate(LOGIN, { replace: true });
                  Toast({
                    message: message,
                    type: "info",
                  });
                }
              });
          }
        }
      });
  };

  return { callAxios,bool };
};
