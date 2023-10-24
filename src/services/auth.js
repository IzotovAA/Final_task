import { instance } from "../api/axios";
import { getFromLocalStorage } from "../helpers/localStorageHelpers";

export const authService = {
  async login(userData) {
    try {
      const data = await instance.post("account/login", userData);
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getCompanyLimitsData() {
    try {
      const data = await instance.get("account/info", {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getHistograms(requestData) {
    try {
      // POST /api/v1/objectsearch/histograms
      const data = await instance.post("objectsearch/histograms", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getPublications(requestData) {
    try {
      // POST /api/v1/objectsearch
      const data = await instance.post("objectsearch", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getDocuments(requestData) {
    try {
      // POST /api/v1/documents
      const data = await instance.post("documents", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
      } else console.log("error: ", error);
    }
  },
};
