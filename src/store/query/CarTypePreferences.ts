/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { CAR_TYPE_PREFERENCE } = endpoints;

export const carTypePreferencesQuery = createApi({
  reducerPath: "cartypepreferences",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: CAR_TYPE_PREFERENCE, method: "get" }),
    }),
  }),
});

export const { useGetListingQuery } = carTypePreferencesQuery;
