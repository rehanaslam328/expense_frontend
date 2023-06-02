/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { CATEGORY } = endpoints;

export const categoryQuery = createApi({
    reducerPath: "category",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: CATEGORY, method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = categoryQuery;