import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";

export const BaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_SERVER_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const { authReducer } = getState() as RootState;
    headers.set("authorization", authReducer.token.access_token);
    headers.set("organization", authReducer.organization_id);
    return headers;
  },
});
