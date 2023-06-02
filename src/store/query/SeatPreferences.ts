/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { SEAT_PREFERENCE } = endpoints;

export const seatPreferencesQuery = createApi({
  reducerPath: "seatpreferences",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: SEAT_PREFERENCE, method: "get" }),
    }),
  }),
});

export const { useGetListingQuery, useLazyGetListingQuery } = seatPreferencesQuery;
