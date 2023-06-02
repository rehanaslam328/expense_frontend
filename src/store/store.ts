/** @format */

import { configureStore, combineReducers /*, ThunkAction, Action */ } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { unauthenticatedMiddleware } from "middleware";
import { roleQuery } from "./query/roles";
import authSlice from "./slices/authSlice";
import { inviteUserQuery } from "./query/invite";
import { mealPreferencesQuery } from "./query/MealPreferences";
import { seatPreferencesQuery } from "./query/SeatPreferences";
import { flightPreferencesQuery } from "./query/FlightPreferences";
import { timePreferencesQuery } from "./query/TimePreferences";
import { carTypePreferencesQuery } from "./query/CarTypePreferences";
import { organizationQuery } from "./query/organization";
import { tagsQuery } from "./query/Tags";
import { expenseQuery } from "./query/Expense";
import { paymentmodeQuery } from "./query/PaymentModes";
import { tripQuery } from "./query/Trip";
import { tripPrefrenceQuery } from "./query/TripPrefrences";
import { tripFieldQuery } from "./query/TripField";
import OrganizationSlice from "./slices/OrganizationSlice";
import { RESET_STATE_ACTION_TYPE } from "./action/resetState";
import { expensePrefrenceQuery } from "./query/ExpensePrefrences";
import { expenseFieldQuery } from "./query/ExpenseField";
import { merchantPreferencesQuery } from "./query/MerchantPrefrences";
import { categoryQuery } from "./query/Category";
import {reportQuery} from "./query/ReportQuery";
import {advancesQuery} from "./query/AdvanceQuery";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const reducers = {
  authReducer: authSlice,
  organizationData: OrganizationSlice,
  [roleQuery.reducerPath]: roleQuery.reducer,
  [mealPreferencesQuery.reducerPath]: mealPreferencesQuery.reducer,
  [seatPreferencesQuery.reducerPath]: seatPreferencesQuery.reducer,
  [flightPreferencesQuery.reducerPath]: flightPreferencesQuery.reducer,
  [timePreferencesQuery.reducerPath]: timePreferencesQuery.reducer,
  [carTypePreferencesQuery.reducerPath]: carTypePreferencesQuery.reducer,
  [inviteUserQuery.reducerPath]: inviteUserQuery.reducer,
  [organizationQuery.reducerPath]: organizationQuery.reducer,
  [organizationQuery.reducerPath]: organizationQuery.reducer,
  [tagsQuery.reducerPath]: tagsQuery.reducer,
  [expenseQuery.reducerPath]: expenseQuery.reducer,
  [paymentmodeQuery.reducerPath]: paymentmodeQuery.reducer,
  [tripQuery.reducerPath]: tripQuery.reducer,
  [tripPrefrenceQuery.reducerPath]: tripPrefrenceQuery.reducer,
  [tripFieldQuery.reducerPath]: tripFieldQuery.reducer,
  [expensePrefrenceQuery.reducerPath]: expensePrefrenceQuery.reducer,
  [expenseFieldQuery.reducerPath]: expenseFieldQuery.reducer,
  [merchantPreferencesQuery.reducerPath]: merchantPreferencesQuery.reducer,
  [categoryQuery.reducerPath]: categoryQuery.reducer,
  [reportQuery.reducerPath]: reportQuery.reducer,
  [advancesQuery.reducerPath]: advancesQuery.reducer
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      // process.env.NODE_ENV === "development"
      // ?
      [
        organizationQuery.middleware,
        roleQuery.middleware,
        mealPreferencesQuery.middleware,
        seatPreferencesQuery.middleware,
        flightPreferencesQuery.middleware,
        timePreferencesQuery.middleware,
        carTypePreferencesQuery.middleware,
        inviteUserQuery.middleware,
        tagsQuery.middleware,
        paymentmodeQuery.middleware,
        expenseQuery.middleware,
        reportQuery.middleware,
        advancesQuery.middleware,
      ]
      // : []
    ),
  // devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
