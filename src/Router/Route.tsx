/** @format */

import { Suspense, useCallback, useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { routeNames } from "static";
import { MainDrawer } from "app/Layout/Drawer";
import { RouterConfig } from "./routes";
import { RootState, useTypedSelector } from "store";
import { AppHeader, PageLoader, SideBar } from "app/shared";

const { DASHBOARD, REGISTER_ORGANIZATION } = routeNames;

export const AppRoutes = () => {
  const { pathname = DASHBOARD } = useLocation();
  const { id_token = "", access_token = "" } = useTypedSelector(
    (state: RootState) => state.authReducer.token || {}
  );
  const auth = Boolean(id_token || access_token);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  const cacheToggle = useCallback(toggle, [collapsed]);

  return (
    <>
      <Layout
        hasSider
        className={auth ? "" : "layout-display"}
        style={{
          minHeight: "100vh",
        }}
      >
        {auth && <SideBar />}
        {auth && (
          <>
            <AppHeader toggle={cacheToggle} />
            {!pathname.includes(REGISTER_ORGANIZATION) && (
              <MainDrawer cacheToggle={cacheToggle} collapsed={collapsed} />
            )}
          </>
        )}
        <Suspense fallback={<PageLoader />}>
          <RouterConfig auth={auth} />
        </Suspense>
      </Layout>
    </>
  );
};
