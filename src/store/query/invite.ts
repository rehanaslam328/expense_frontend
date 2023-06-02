/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./BaseQuery";
import { endpoints } from "static";

const { INVITE_USER } = endpoints;

export const inviteUserQuery = createApi({
  reducerPath: "invite_user",
  keepUnusedDataFor: 3600,
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getInviteeListing: builder.query<any, any>({
      query: () => ({ url: INVITE_USER, method: "get" }),
    }),
  }),
});

export const { useGetInviteeListingQuery, useLazyGetInviteeListingQuery } = inviteUserQuery;
