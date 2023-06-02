/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { EXPENSE } = endpoints;

export const expenseQuery = createApi({
  reducerPath: "expenses",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: (paginate) => {
        const { page = 1, pageSize = 10 } = paginate;
        return {
          url: `${EXPENSE}?filter=${"all"}&page=${page}&sort_by=${"name"}&order_by=${"asc"}&view=${pageSize}&search=${""}`,
          method: "get",
        }
      }
    }),
  }),
});

export const { useGetListingQuery } = expenseQuery;
