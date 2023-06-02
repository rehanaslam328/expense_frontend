/** @format */

import { ReactNode } from "react";
import { Layout } from "antd";
import { useLocation, Navigate } from "react-router-dom";
import { routeNames } from "static";
import { AppLayout } from "app/Layout";

type IProps = {
  auth: boolean;
  children: ReactNode;
  layout?: boolean;
};

const { LOGIN } = routeNames;

export const PrivateRoute = ({ children, auth, layout = true }: IProps) => {
  const location = useLocation();
  return !auth ? (
    <Navigate to={LOGIN} state={{ path: location.pathname }} replace />
  ) : layout ? (
    <Layout hasSider>
      <AppLayout auth={auth}>{children}</AppLayout>
    </Layout>
  ) : (
    <>{children}</>
  );
};
