/** @format */

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "app/shared";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks";
import { SignUpForm, signUpSubmitProps } from "./";
import { endpoints, routeNames } from "static/routes";
import { ssoSignUpPath } from "utils";

const { SIGNUP } = endpoints;
const { LOGIN } = routeNames;

export const SignUp: FC = () => {
  const navigate = useNavigate();
  const sso_signup_url = ssoSignUpPath();
  const [loading, , setTrue, setFalse] = useLoading();
  if (process.env.REACT_APP_SSO_ENABLE === "true") window.location.href = sso_signup_url;

  const onSubmit = (data: signUpSubmitProps) => {
    data.password_confirmation = data.password;
    setTrue();
    axiosCall({ data, method: "post", url: SIGNUP, isAuth: false }).then((res) => {
      if (res) {
        setFalse();
        Toast({ message: res.message, type: "info" });
        setTimeout(() => {
          navigate(LOGIN);
        }, 1500);
      }
      setFalse();
    });
  };

  return (
    <div style={{ height: "100%" }}>
      <SignUpForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
