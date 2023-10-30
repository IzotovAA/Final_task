import { instance } from "../api/axios";
import { getFromLocalStorage } from "./localStorage";

export const authService = {
  async login(userData) {
    try {
      const data = await instance.post("account/login", userData);
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
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
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getHistograms(requestData) {
    try {
      const data = await instance.post("objectsearch/histograms", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getPublications(requestData) {
    try {
      const data = await instance.post("objectsearch", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      } else console.log("error: ", error);
    }
  },

  async getDocuments(requestData) {
    try {
      const data = await instance.post("documents", requestData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.log("error: ", error);
      }
    }
  },
};
