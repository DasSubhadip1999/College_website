import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

function Private() {
  const { isLoggedIn, checking } = useAuthStatus();

  if (checking) {
    return <h1>Loading...</h1>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default Private;
