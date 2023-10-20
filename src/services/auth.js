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
};
