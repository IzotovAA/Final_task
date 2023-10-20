import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeFromLocalStorage } from "../../helpers/localStorageHelpers";
import setInitialState from "../../services/setInitialState";
import { authService } from "../../services/auth";

const isAuth = setInitialState();

const initialState = {
  login: "",
  password: "",
  isAuth: isAuth,
  usedCompanyCount: -1,
  companyLimit: -1,
  requesStatus: null,
  error: null,
};

export const companyLimitData = createAsyncThunk(
  "user/companyLimitData",
  async function () {
    let usedCompanyCount, companyLimit;

    try {
      const limitInfo = await authService.getCompanyLimitsData();
      const response = JSON.parse(limitInfo.request.response);

      usedCompanyCount = response.eventFiltersInfo.usedCompanyCount;
      companyLimit = response.eventFiltersInfo.companyLimit;

      return {
        usedCompanyCount: usedCompanyCount,
        companyLimit: companyLimit,
      };
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.login = "";
      state.password = "";
      state.usedCompanyCount = -1;
      state.companyLimit = -1;
      state.requesStatus = null;
      state.error = null;

      removeFromLocalStorage("token");
      removeFromLocalStorage("expire");
    },
  },
  extraReducers: {
    [companyLimitData.pending]: (state) => {
      state.requesStatus = "inProgress";
      state.error = null;
    },
    [companyLimitData.fulfilled]: (state, action) => {
      state.usedCompanyCount = action.payload.usedCompanyCount;
      state.companyLimit = action.payload.companyLimit;
      state.requesStatus = "complete";
    },
    [companyLimitData.rejected]: (state, action) => {
      state.error = action.payload;
      state.requesStatus = null;
    },
  },
});

export const { setLogin, setPassword, login, logout, updateDataFromStore } =
  userSlice.actions;

export default userSlice.reducer;
