/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { MERCHANT_PREFERENCE } = endpoints;

export const merchantPreferencesQuery = createApi({
    reducerPath: "merchantpreferences",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: MERCHANT_PREFERENCE, method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = merchantPreferencesQuery;