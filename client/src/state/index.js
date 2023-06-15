import { createSlice } from "@reduxjs/toolkit";
// import {login_request} from '../../dummydata/response';

const initialState = {
  token: null,
  user: {
    currentLocation: {
      longitude: 106.67271589689359,
      latitude: 10.829464724702163,
    },
  },
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
      state.user = {
        currentLocation: {
          longitude: 106.67271589689359,
          latitude: 10.829464724702163,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogout, setLogin, setUser } = stateSlice.actions;

export default stateSlice.reducer;
