import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { logout } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";

export default function AuthNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/auth">Home</Link>
            </li>
            <li>
              <Link to="/auth/turfs">Turfs</Link>
            </li>
            <li>
              <Link to="/auth/booking-history">My Bookings</Link>
            </li>
            <li>
              <NavLink
                to="/auth/become-owner"
                className={({ isActive }) => (isActive ? "text-accent" : "")}
              >
                Become an Owner
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/auth" className="btn btn-ghost normal-case text-xl">
          <img
            src="/logo.png"
            alt="TurfSpot"
            className="h-10 w-10 mask mask-squircle"
          />
          TurfSpot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/auth">Home</Link>
          </li>
          <li>
            <Link to="/auth/turfs">Turfs</Link>
          </li>
          <li>
            <Link to="/auth/booking-history">My Bookings</Link>
          </li>
          <li>
            <NavLink
              to="/auth/become-owner"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              Become an Owner
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
