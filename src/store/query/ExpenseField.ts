import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";

export const expenseFieldQuery = createApi({
    reducerPath: "ExpenseField",
    keepUnusedDataFor: 3600,
    baseQuery: BaseQuery,
    endpoints: (builder) => ({
        getListing: builder.query<any, any>({
            query: () => ({ url: "preferences/expense", method: "get" }),
        }),
    }),
});

export const { useGetListingQuery } = expenseFieldQuery;