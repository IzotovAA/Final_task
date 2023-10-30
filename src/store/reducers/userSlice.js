import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeFromLocalStorage } from "../../services/localStorage";
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
  requestHistogramsStatus: null,
  requestPublicationsStatus: null,
  requestDocumentsStatus: null,
  histograms: [],
  publicationsId: [],
  documents: [],
  documentsForRender: [],
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
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const histograms = createAsyncThunk(
  "user/histograms",
  async function (requestData) {
    try {
      const histograms = await authService.getHistograms(requestData);

      return histograms.data.data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const publications = createAsyncThunk(
  "user/publications",
  async function (requestData) {
    try {
      const publications = await authService.getPublications(requestData);

      return publications.data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  }
);

export const documents = createAsyncThunk(
  "user/documents",
  async function (requestData) {
    try {
      const documents = await authService.getDocuments(requestData);

      return documents.data;
    } catch (error) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.log("error: ", error);
      }
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
      state.requestCompanyStatus = null;
      state.usedCompanyCount = -1;
      state.companyLimit = -1;
      state.error = null;
      state.inn = "";
      state.tonality = "any";
      state.documentsLimit = 0;
      state.startDate = "";
      state.endDate = "";
      state.requestHistogramsStatus = null;
      state.requestPublicationsStatus = null;
      state.requestDocumentsStatus = null;
      state.histograms = [];
      state.publicationsId = [];
      state.documents = [];
      state.documentsForRender = [];

      removeFromLocalStorage("token");
      removeFromLocalStorage("expire");
    },

    setInn: (state, action) => {
      state.inn = action.payload;
    },

    setDocumentsLimit: (state, action) => {
      state.documentsLimit = action.payload;
    },

    setStartDate: (state, action) => {
      let startDate = action.payload + "T00:00:00+03:00";
      state.startDate = startDate;
      // "startDate": "2019-01-01T00:00:00+03:00",
    },

    setEndDate: (state, action) => {
      let endDate = action.payload + "T23:59:59+03:00";
      state.endDate = endDate;
      // "endDate": "2022-08-31T23:59:59+03:00"
    },

    initSearchForm: (state) => {
      state.inn = "";
      state.documentsLimit = 0;
      state.startDate = "";
      state.endDate = "";

      state.requestHistogramsStatus = null;
      state.requestPublicationsStatus = null;
      state.requestDocumentsStatus = null;
      state.histograms = [];
      state.publicationsId = [];
      state.documents = [];
      state.documentsForRender = [];
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

    [histograms.pending]: (state) => {
      state.requestHistogramsStatus = "inProgress";
      state.error = null;
    },
    [histograms.fulfilled]: (state, action) => {
      state.histograms = action.payload;
      state.requestHistogramsStatus = "complete";
    },
    [histograms.rejected]: (state, action) => {
      state.error = action.payload;
      state.requestHistogramsStatus = null;
    },

    [publications.pending]: (state) => {
      state.requestPublicationsStatus = "inProgress";
      state.error = null;
    },
    [publications.fulfilled]: (state, action) => {
      action.payload.items.forEach((element) => {
        state.publicationsId.push(element.encodedId);
      });
      state.requestPublicationsStatus = "complete";
    },
    [publications.rejected]: (state, action) => {
      state.error = action.payload;
      state.requestPublicationsStatus = null;
    },

    [documents.pending]: (state) => {
      state.requestDocumentsStatus = "inProgress";
      state.error = null;
    },
    [documents.fulfilled]: (state, action) => {
      action.payload.forEach((element) => {
        state.documents.push(element);
      });
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
  initSearchForm,
} = userSlice.actions;

export default userSlice.reducer;
