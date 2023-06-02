import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "services";
import { Tokens } from "store/types";

const initialState = {
  token: {
    access_token: "",
    expires_in: "",
    id_token: "",
    refresh_token: "",
    token_type: "",
    details: {},
  } as Tokens,
  organization_id: "",
  loading: false,
  error: {},
};

export const apiService = createAsyncThunk("login", apiCall);
export const Logout = createAsyncThunk("logout", apiCall);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => state,
    setOrganization: (state, action) => {
      state.organization_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiService.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.loading = false;
      state.organization_id = payload?.user?.current_organization_id;
    });
    builder.addCase(apiService.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log("rejected", { state, action });
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(Logout.rejected, (state, action) => {
      if (action.payload) {
        console.log("rejected", { state, action });
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { setOrganization } = authSlice.actions;
export default authSlice.reducer;
