/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { CREATE_ORGANIZATION, GET_ORGANIZATIONS_LIST, SET_ORGANIZATION, CURRENCY, TAXES } =
  endpoints;

export const organizationQuery = createApi({
  reducerPath: "organization",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getList: builder.query<any, any /*RequestPayload*/>({
      query: (_) => {
        return {
          url: CREATE_ORGANIZATION,
          method: "get",
          // responseHandler: (response) => {
          //   return response.json();
          // }
        };
      },
      keepUnusedDataFor: 100,
    }),
    getOrganizations: builder.query<any, any>({
      query: (_) => ({ url: GET_ORGANIZATIONS_LIST, method: "get" }),
      keepUnusedDataFor: 3600,
      transformResponse: (resp: any, meta, arg) => {
        console.log({ resp, meta, arg });
        return resp;
      },
    }),
    setOrganization: builder.query<any, any>({
      query: (params) => ({
        url: `${SET_ORGANIZATION}/${params}`,
        method: "post",
      }),
      keepUnusedDataFor: 0,
    }),
    getCurrencyList: builder.query<any, any>({
      query: () => ({ url: CURRENCY, method: "get" }),
      keepUnusedDataFor: 3600,
    }),
    getTaxList: builder.query<any, any>({
      query: () => ({ url: TAXES, method: "get" }),
    }),
  }),
  refetchOnMountOrArgChange: 6000,
});

export const {
  useLazyGetListQuery,
  useGetListQuery,
  useGetOrganizationsQuery,
  useLazySetOrganizationQuery,
  useSetOrganizationQuery,
  useGetCurrencyListQuery,
  useGetTaxListQuery,
} = organizationQuery;
