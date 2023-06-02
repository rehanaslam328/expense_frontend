/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { TRIP } = endpoints;

export const tripQuery = createApi({
  reducerPath: "triplist",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getListing: builder.query<any, any>({
      query: () => ({ url: TRIP, method: "get" }),
    }),
    getFormData: builder.query<any, any>({
      query: () => ({ url: `${TRIP}/create`, method: "get" }),
    }),

    getCities: builder.query<any, any>({
      query: (id: number) => {
        const path = id ? `${TRIP}/cities?country_id=${id}` : `${TRIP}/cities`;
        return { url: path, method: "get" };
      },
    }),
  }),
});

export const { useGetListingQuery, useGetFormDataQuery, useGetCitiesQuery } = tripQuery;
