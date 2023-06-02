/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { REPORTS } = endpoints;

export const reportQuery = createApi({
  reducerPath: "reports",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getReports: builder.query<any, any>({
      query: (paginate) => {
        const { page = 1, pageSize = 10 } = paginate;
        return {
          url: `${REPORTS}?filter=${"all"}&page=${page}&sort_by=${"name"}&order_by=${"asc"}&view=${pageSize}&search=${""}`,
          method: "get",
        }
      }
    }),
  }),
});

export const { useGetReportsQuery } = reportQuery;
