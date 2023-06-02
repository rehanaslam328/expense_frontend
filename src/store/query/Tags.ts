/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { TAGS } = endpoints;

export const tagsQuery = createApi({
  reducerPath: "tags",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: (paginate) => {
        const { page = 1, pageSize = 10 } = paginate;
        return {
          url: `${TAGS}?filter=${"all"}&page=${page}&sort_by=${"name"}&order_by=${"asc"}&view=${pageSize}&search=${""}`,
          method: "get",
        }
      }
    }),
  }),
});

export const { useGetListingQuery } = tagsQuery;
