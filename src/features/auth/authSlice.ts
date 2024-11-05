import { createSlice } from "@reduxjs/toolkit";
import { IntialUserState } from "../../helprs/helpres";

const authSlice = createSlice({
  name: "auth",
  initialState: IntialUserState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice;
