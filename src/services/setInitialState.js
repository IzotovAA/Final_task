import { getFromLocalStorage } from "../helpers/localStorageHelpers";

export default function setInitialState() {
  const token = getFromLocalStorage("token");
  const expire = getFromLocalStorage("expire");
  const tokenLifeTime = expire ? new Date(expire).getTime() : "";
  const now = Date.now();
  // console.log("Date.now()", now);
  // console.log("expire", expire);
  // console.log("tokenLifeTime", tokenLifeTime);
  // console.log("tokenLifeTime - now", tokenLifeTime - now);

  const isAuth = token && expire && tokenLifeTime - now > 0 ? true : false;

  return isAuth;
}
