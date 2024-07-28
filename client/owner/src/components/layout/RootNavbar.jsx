import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const RootNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
  // const handleLogout = useCallback(() => {
  //   dispatch(logout());

  //   //  clear the navigation history
  //   window.history.pushState(null, "", "/");

  //   // Navigate to the home page
  //   navigate("/", { replace: true });

  //   // prevent going to the previous page
  //   const handlePopState = () => {
  //     window.history.pushState(null, "", "/");
  //   };
  //   window.addEventListener("popstate", handlePopState);

  
  // }, [navigate]);

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
        <Link to="/" className="btn btn-ghost normal-case text-xl">
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

export default RootNavbar;
