import { getFromLocalStorage } from "./localStorage";

export default function setInitialState() {
  const token = getFromLocalStorage("token");
  const expire = getFromLocalStorage("expire");
  const tokenLifeTime = expire ? new Date(expire).getTime() : "";
  const now = Date.now();

  const isAuth = token && expire && tokenLifeTime - now > 0 ? true : false;

  return isAuth;
}
