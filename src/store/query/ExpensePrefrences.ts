/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";


export const expensePrefrenceQuery = createApi({
    reducerPath: "PrefrenceExpense",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: "numberPreferences/expense", method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = expensePrefrenceQuery;
