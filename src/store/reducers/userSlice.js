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
  requestCompanyStatus: null,
  error: null,
  inn: "",
  tonality: "any",
  documentsLimit: 0,
  startDate: "",
  endDate: "",
  requestPublicationsStatus: null,
  requestDocumentsStatus: null,
  publicationsId: [],
  documents: [],
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

export const histograms = createAsyncThunk(
  "user/histograms",
  async function (requestData) {
    try {
      const histograms = await authService.getHistograms(requestData);
      console.log("histograms", histograms);
      console.log("histograms.data.data", histograms.data.data);

      return histograms.data.data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const publications = createAsyncThunk(
  "user/publications",
  async function (requestData) {
    try {
      const publications = await authService.getPublications(requestData);
      console.log("publications", publications);
      console.log("publications.data", publications.data);

      return publications.data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const documents = createAsyncThunk(
  "user/documents",
  async function (requestData) {
    try {
      const documents = await authService.getDocuments(requestData);
      console.log("documents", documents);
      console.log("documents.data", documents.data);

      return documents.data;
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
      state.requestCompanyStatus = null;
      state.error = null;

      removeFromLocalStorage("token");
      removeFromLocalStorage("expire");
    },
    setInn: (state, action) => {
      state.inn = action.payload;
      console.log("state.inn", state.inn);
    },
    setDocumentsLimit: (state, action) => {
      state.documentsLimit = action.payload;
      console.log("state.documentsLimit", state.documentsLimit);
    },
    setStartDate: (state, action) => {
      let startDate = action.payload + "T00:00:00+03:00";
      state.startDate = startDate;
      console.log("state.startDate", state.startDate);
      // "startDate": "2019-01-01T00:00:00+03:00",
    },
    setEndDate: (state, action) => {
      let endDate = action.payload + "T23:59:59+03:00";
      state.endDate = endDate;
      console.log("state.endDate", state.endDate);
      // "endDate": "2022-08-31T23:59:59+03:00"
    },
  },
  extraReducers: {
    [companyLimitData.pending]: (state) => {
      state.requestCompanyStatus = "inProgress";
      state.error = null;
    },
    [companyLimitData.fulfilled]: (state, action) => {
      state.usedCompanyCount = action.payload.usedCompanyCount;
      state.companyLimit = action.payload.companyLimit;
      state.requestCompanyStatus = "complete";
    },
    [companyLimitData.rejected]: (state, action) => {
      state.error = action.payload;
      state.requestCompanyStatus = null;
    },

    [publications.pending]: (state) => {
      state.requestPublicationsStatus = "inProgress";
      state.error = null;
    },
    [publications.fulfilled]: (state, action) => {
      state.publicationsId = action.payload.items;
      console.log("state.publicationsId userSlice", state.publicationsId);
      state.requestPublicationsStatus = "complete";
    },
    [publications.rejected]: (state, action) => {
      state.error = action.payload;
      state.requestPublicationsStatus = null;
    },

    [documents.pending]: (state) => {
      state.requestDocumentsStatus = "inProgress";
      state.error = null;
      const idsArr = state.publicationsId;
      console.log("idsArr", idsArr);
    },
    [documents.fulfilled]: (state, action) => {
      state.documents = action.payload.items;
      console.log("state.publicationsId userSlice", state.publicationsId);
      state.requestDocumentsStatus = "complete";
    },
    [documents.rejected]: (state, action) => {
      state.error = action.payload;
      state.requestDocumentsStatus = null;
    },
  },
});

export const {
  setLogin,
  setPassword,
  login,
  logout,
  setInn,
  setDocumentsLimit,
  setStartDate,
  setEndDate,
} = userSlice.actions;

export default userSlice.reducer;
