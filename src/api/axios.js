import axios from "axios";
import { getFromLocalStorage } from "../helpers/localStorageHelpers";

export const instance = axios.create({
  baseURL: "https://gateway.scan-interfax.ru/api/v1/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getFromLocalStorage("token")}`,
  },
});
