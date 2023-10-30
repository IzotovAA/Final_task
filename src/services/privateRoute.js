import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const auth = useSelector((state) => state.user.isAuth);
  return auth ? <Outlet /> : <Navigate to="/" />;
}
