/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";


export const tripPrefrenceQuery = createApi({
    reducerPath: "PrefrenceTrip",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: "numberPreferences/trip", method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = tripPrefrenceQuery;
