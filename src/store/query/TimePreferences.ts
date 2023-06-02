/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { TIME_PREFERENCE } = endpoints;

export const timePreferencesQuery = createApi({
  reducerPath: "timepreferences",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: TIME_PREFERENCE, method: "get" }),
    }),
  }),
});

export const { useGetListingQuery, useLazyGetListingQuery } = timePreferencesQuery;
