/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";

export const tripFieldQuery = createApi({
    reducerPath: "TripField",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: "preferences/trip", method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = tripFieldQuery;
