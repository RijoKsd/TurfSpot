import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice.js";

const AuthenticatedNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state?.auth?.role);
 const path = role === "admin" ? "/admin" : "/owner";
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-md">
      <div className="navbar-start">
        <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to={path} className="btn btn-ghost normal-case text-xl max-sm:p-0">
          <img
            src="/logo.png"
            alt="TurfSpot"
            className="h-10 w-10 mask mask-squircle"
          />
          TurfSpot
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <button className="btn btn-primary btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthenticatedNavbar;
