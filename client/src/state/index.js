import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {},
  userFriends: [],
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = {};
    },
    setUserFriends: (state, action) => {
      state.userFriends = action.payload.userFriends;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogout, setLogin, setUser, setUserFriends } =
  stateSlice.actions;

export default stateSlice.reducer;
