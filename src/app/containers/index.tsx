/** @format */

import { lazy } from "react";
export const Tax = lazy(() => import(/* webpackChunkName: 'Tax' */ "./Tax"));
export const Currency = lazy(() => import(/* webpackChunkName: 'Currency' */ "./Currency"));
export const Approvals = lazy(() => import(/* webpackChunkName: 'Approvals' */ "./Approvals"));
export const Analytics = lazy(() => import(/* webpackChunkName: 'Analytics' */ "./Analytics"));
export const Trips = lazy(() => import(/* webpackChunkName: 'Trips' */ "./Trips"));
export const NewTrip = lazy(() => import(/* webpackChunkName: 'Create Trip' */ "./Trips/Create"));
export const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */ "./Dashboard"));
export const Register = lazy(() => import(/* webpackChunkName: 'Organization' */ "./Organization"));
export const UserRoles = lazy(() => import(/* webpackChunkName: 'UserRoles' */ "./UserRoles/Tab"));
export const Organizations = lazy(
  () => import(/* webpackChunkName: 'Listing' */ "./Organization/Listing")
);
export const CreateOrganization = lazy(
  () => import(/* webpackChunkName: 'Organization_Create' */ "./Organization/Create")
);
export const EditOrganization = lazy(
  () => import(/* webpackChunkName: 'Organization_Edit' */ "./Organization/Edit")
);
export const MealPreferences = lazy(
  () => import(/* webpackChunkName: 'MealPreferences' */ "./Settings/Preferences/MealPreferences")
);
export const SeatPreferences = lazy(
  () => import(/* webpackChunkName: 'SeatPreferences' */ "./Settings/Preferences/SeatPreferences")
);
export const FlightPreferences = lazy(
  () => import(/* webpackChunkName: 'FlightPeferences' */ "./Settings/Preferences/FlightPeferences")
);
export const TimePreferences = lazy(
  () => import(/* webpackChunkName: 'TimePreferences' */ "./Settings/Preferences/TimePreferences")
);
export const CarTypePreferences = lazy(
  () => import(/* webpackChunkName: 'CarTypePreferences' */ "./Settings/Preferences/CarTypePreferences")
);
export const Expenses = lazy(() => import(/* webpackChunkName: 'Expenses' */ "./Expenses"));
export const CreateExpense = lazy(
  () => import(/* webpackChunkName: 'expense_create' */ "./Expenses/Create")
);
export const TAGS = lazy(() => import(/* webpackChunkName: 'Tags' */ "./Tags"));
export const PaymentModes = lazy(() => import(/* webpackChunkName: 'Tags' */ "./PaymentModes"));
export const REPORTS = lazy(() => import(/* webpackChunkName: 'Reports' */ "./Reports"));
export const ADVANCES = lazy(() => import(/* webpackChunkName: 'Reports' */ "./Advances"));
export const SETTINGS = lazy(() => import(/* webpackChunkName: 'Reports' */ "./Settings"));
export const MODULES = lazy(() => import(/* webpackChunkName: 'Modules' */ "./Settings/Customization/Modules"));
export const ModuleTrips = lazy(
  () => import(/* webpackChunkName: 'Module Trip' */ "./Settings/Customization/Modules/Trips"));
export const ModuleExpense = lazy(
  () => import(/* webpackChunkName: 'Module Expense' */ "./Settings/Customization/Modules/Expense"));
export const ModuleMerchant = lazy(
  () => import(/* webpackChunkName: 'Module Merchant' */ "./Settings/Customization/Modules/Merchant"));
export const ModulePaidThrough = lazy(
  () => import(/* webpackChunkName: 'Module Paid Throuh Account' */ "./Settings/Customization/Modules/PaidThroughAccounts"));
export const ModuleCategories = lazy(
  () => import(/* webpackChunkName: 'Module Category' */ "./Settings/Customization/Modules/Category"));