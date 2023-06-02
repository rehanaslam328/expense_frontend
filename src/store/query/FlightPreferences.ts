/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { FLIGHT_PREFERENCE } = endpoints;

export const flightPreferencesQuery = createApi({
  reducerPath: "flightpreferences",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: FLIGHT_PREFERENCE, method: "get" }),
    }),
  }),
});

export const { useGetListingQuery, useLazyGetListingQuery } = flightPreferencesQuery;
