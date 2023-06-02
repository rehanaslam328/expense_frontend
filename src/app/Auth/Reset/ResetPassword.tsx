/** @format */

import { useNavigate } from "react-router-dom";
import { Toast } from "app/shared";
import { resetSubmitProps } from ".";
import { axiosCall } from "services";
import { ResetPasswordForm } from ".";
import { useLoading } from "app/Hooks";
import { endpoints, routeNames } from "static";

const { LOGIN } = routeNames;
const { RESET_PASSWORD } = endpoints;

export const ResetPassword = () => {
  const [loading, toggle] = useLoading();
  const navigate = useNavigate();

  const onSubmit = (data: resetSubmitProps) => {
    toggle();
    axiosCall({
      data,
      method: "post",
      url: RESET_PASSWORD,
      isAuth: false,
    }).then((res) => {
      toggle();
      Toast({ message: res.message, type: "info" });
      setTimeout(() => navigate(LOGIN), 1500);
    });
  };
  return (
    <div style={{ height: "100%" }}>
      <ResetPasswordForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
