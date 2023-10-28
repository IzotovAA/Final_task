import axios from "axios";
import { getFromLocalStorage } from "../services/localStorage";

export const instance = axios.create({
  baseURL: "https://gateway.scan-interfax.ru/api/v1/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getFromLocalStorage("token")}`,
  },
});
