/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { ADVANCES } = endpoints;

export const advancesQuery = createApi({
  reducerPath: "advances",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getAdvances: builder.query<any, any>({
      query: (paginate) => {
        const { page = 1, pageSize = 10 } = paginate;
        return {
          url: `${ADVANCES}?filter=${"all"}&page=${page}&sort_by=${"name"}&order_by=${"asc"}&view=${pageSize}&search=${""}`,
          method: "get",
        }
      }
    }),
  }),
});

export const { useGetAdvancesQuery } = advancesQuery;
