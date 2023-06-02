/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { ROLE } = endpoints;

export const roleQuery = createApi({
  reducerPath: "roles",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getroleListing: builder.query<any, any>({
      query: () => ({ url: ROLE, method: "get" }),
    }),
  }),
});

export const { useGetroleListingQuery, useLazyGetroleListingQuery } = roleQuery;
