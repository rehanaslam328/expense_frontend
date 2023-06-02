/** @format */
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { LoginFormProps } from ".";
import { endpoints, routeNames } from "static";
import { apiService } from "store/slices/authSlice";
import { useTypedDispatch, useTypedSelector } from "store";
import { ssoSignInPath } from "utils";

const { LOGIN } = endpoints;
const { DASHBOARD, REGISTER_ORGANIZATION } = routeNames;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const sso_url = ssoSignInPath();
  const { loading } = useTypedSelector(({ authReducer }) => authReducer);
  if (process.env.REACT_APP_SSO_ENABLE === "true") window.location.href = sso_url;

  const onSubmit = (data: LoginFormProps) => {
    dispatch(apiService({ data, method: "post", url: LOGIN, isAuth: false }))
      .unwrap()
      .then((res) => {
        const { user = {} } = res ?? {};
        if (user.basic_role_id === 0 && !user.current_organization_id) navigate(DASHBOARD);
        else if (user.basic_role_id === 1)
          !user.current_organization_id ? navigate(REGISTER_ORGANIZATION) : navigate(DASHBOARD);
      });
  };

  return (
    <div style={{ height: "100%" }}>
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
