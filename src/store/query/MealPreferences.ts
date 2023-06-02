/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { MEAL_PREFERENCE } = endpoints;

export const mealPreferencesQuery = createApi({
  reducerPath: "mealpreferences",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    listMeal: builder.query<any, any>({
      query: () => ({ url: MEAL_PREFERENCE, method: "get" }),
    }),
  }),
});

export const { useListMealQuery } = mealPreferencesQuery;
