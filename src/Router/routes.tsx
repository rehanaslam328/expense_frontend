/** @format */

import { ReactNode } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import * as AuthRoutes from "app/Auth";
import * as AppRoutes from "app/containers";
import { routeNames } from "static";
import { NotFound } from "app/shared";
import { PrivateRoute } from "./Private";

export const RouterConfig = ({ auth }: { auth: boolean }) => {
  const AuthRoute = ({ component }: { component: ReactNode }) => (
    <PrivateRoute auth={auth}>{component}</PrivateRoute>
  );
  const CheckAuth = ({ children }: { children: ReactNode }) =>
    auth ? <Navigate to="/dashboard" /> : <>{children}</>;

  const publicRoutes: RouteObject[] = [
    {
      path: routeNames.LOGIN,
      element: (
        <CheckAuth>
          <AuthRoutes.Login />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.SINGUP,
      element: (
        <CheckAuth>
          <AuthRoutes.SignUp />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.LOGIN,
      element: (
        <CheckAuth>
          <AuthRoutes.Login />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.FORGET_PASSWORD,
      element: (
        <CheckAuth>
          <AuthRoutes.ForgetPassword />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.RESET_PASSWORD,
      element: (
        <CheckAuth>
          <AuthRoutes.ResetPassword />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.VERIFY,
      element: (
        <CheckAuth>
          <AuthRoutes.Verification />
        </CheckAuth>
      ),
    },
    {
      path: routeNames.SSO,
      element: <AuthRoutes.Sso />,
    },
    {
      path: "/",
      element: (
        <CheckAuth>
          <AuthRoutes.LandingPage />
        </CheckAuth>
      ),
    },
  ];

  const routes = useRoutes([
    ...publicRoutes,
    {
      path: routeNames.DASHBOARD,
      element: <AuthRoute component={<AppRoutes.Dashboard />} />,
    },
    {
      path: routeNames.REGISTER_ORGANIZATION,
      element: (
        <PrivateRoute auth={auth} layout={false}>
          <AppRoutes.Register />
        </PrivateRoute>
      ),
    },
    {
      path: routeNames.ORGANIZATION_LISTING,
      element: <AuthRoute component={<AppRoutes.Organizations />} />,
    },
    {
      path: routeNames.ORGANIZATION_CREATE,
      element: <AuthRoute component={<AppRoutes.CreateOrganization />} />,
    },
    {
      path: routeNames.ORGANIZATION_PROFILE,
      element: <AuthRoute component={<AppRoutes.EditOrganization />} />,
    },
    {
      path: routeNames.TRIPS,
      element: <AuthRoute component={<AppRoutes.Trips />} />,
    },
    {
      path: routeNames.NEW_TRIP,
      element: <AuthRoute component={<AppRoutes.NewTrip />} />,
    },
    {
      path: routeNames.MODULES,
      element: <AuthRoute component={<AppRoutes.MODULES />} />,
    },
    {
      path: routeNames.MODULES_TRIP,
      element: <AuthRoute component={<AppRoutes.ModuleTrips />} />,
    },
    {
      path: routeNames.MODULES_EXPENSE,
      element: <AuthRoute component={<AppRoutes.ModuleExpense />} />,
    },
    {
      path: routeNames.MODULES_MERCHANT,
      element: <AuthRoute component={<AppRoutes.ModuleMerchant />} />,
    },
    {
      path: routeNames.MODULES_PAID_THROUGH,
      element: <AuthRoute component={<AppRoutes.PaymentModes />} />,
    },
    { path: routeNames.MODULES_CATEGORY, element: <AuthRoute component={<AppRoutes.ModuleCategories />} /> },
    { path: routeNames.CURRENCY, element: <AuthRoute component={<AppRoutes.Currency />} /> },
    { path: routeNames.APPROVALS, element: <AuthRoute component={<AppRoutes.Approvals />} /> },
    { path: routeNames.ANALYTICS, element: <AuthRoute component={<AppRoutes.Analytics />} /> },
    { path: routeNames.TAX, element: <AuthRoute component={<AppRoutes.Tax />} /> },
    {
      path: routeNames.MEAL_PREFENRECES,
      element: <AuthRoute component={<AppRoutes.MealPreferences />} />,
    },
    {
      path: routeNames.SEAT_PREFENRECES,
      element: <AuthRoute component={<AppRoutes.SeatPreferences />} />,
    },
    {
      path: routeNames.FLIGHT_PREFENRECES,
      element: <AuthRoute component={<AppRoutes.FlightPreferences />} />,
    },
    {
      path: routeNames.TIME_PREFENRECES,
      element: <AuthRoute component={<AppRoutes.TimePreferences />} />,
    },
    {
      path: routeNames.CAR_TYPE_PREFENRECES,
      element: <AuthRoute component={<AppRoutes.CarTypePreferences />} />,
    },
    { path: routeNames.EXPENSES, element: <AuthRoute component={<AppRoutes.Expenses />} /> },
    {
      path: routeNames.NEW_EXPENSE,
      element: <AuthRoute component={<AppRoutes.CreateExpense />} />,
    },
    {
      path: routeNames.TAGS,
      element: <AuthRoute component={<AppRoutes.TAGS />} />,
    },
    {
      path: routeNames.PAYMENTS_MODES,
      element: <AuthRoute component={<AppRoutes.PaymentModes />} />,
    },
    {
      path: routeNames.REPORTS,
      element: <AuthRoute component={<AppRoutes.REPORTS />} />,
    },
    {
      path: routeNames.ADVANCES,
      element: <AuthRoute component={<AppRoutes.ADVANCES />} />,
    },
    {
      path: routeNames.SETTING,
      element: <AuthRoute component={<AppRoutes.SETTINGS />} />,
    },
    {
      path: routeNames.USERS,
      element: <AuthRoute component={<AppRoutes.UserRoles />} />,
      // children: [
      //   {
      //     index: true,
      //     element: <AuthRoute component={<Users />} />,
      //   },
      //   {
      //     path: ROLES,
      //     element: <AuthRoute component={<Roles />} />,
      //   },
      // ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};
