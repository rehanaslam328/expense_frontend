/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { PAYMENTS_MODES } = endpoints;

export const paymentmodeQuery = createApi({
  reducerPath: "payment_modes",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: PAYMENTS_MODES, method: "get" }),
    }),
  }),
});

export const { useGetListingQuery } = paymentmodeQuery;
