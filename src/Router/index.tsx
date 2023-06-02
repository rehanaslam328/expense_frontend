/** @format */

import { useEffect } from "react";
import { AppRoutes } from "./Route";
import { useNavigate } from "react-router-dom";
import { RootState, useTypedSelector } from "store";
import { routeNames } from "static";
import { Container } from "app/shared";

export const AppRoute = () => {
  const navigate = useNavigate();
  const { details, organization_id } = useTypedSelector(
    (state: RootState) => (state.authReducer as any) || {}
  );
  useEffect(() => {
    if (process.env.REACT_APP_SSO_ENABLE === "true") {
      console.log('check redirect from router index');
      if (details?.basic_role_id === 0 && !organization_id) navigate(routeNames.DASHBOARD);
      else if (details?.basic_role_id === 1) {
        !organization_id
          ? navigate(routeNames.REGISTER_ORGANIZATION)
          : navigate(routeNames.DASHBOARD);
      }
    }
    //eslint-disable-next-line
  }, [details, organization_id]);
  return (
    <>
      <AppRoutes />
      <Container />
    </>
  );
};
