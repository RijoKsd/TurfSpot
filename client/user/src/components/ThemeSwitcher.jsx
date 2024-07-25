import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Laptop } from "lucide-react";
import { setTheme } from  "../redux/slices/themeSlice"

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.current);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {theme === "dark" ? <Moon /> : theme === "light" ? <Sun /> : <Laptop />}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => toggleTheme("light")}>
            <Sun /> Light
          </a>
        </li>
        <li>
          <a onClick={() => toggleTheme("dark")}>
            <Moon /> Dark
          </a>
        </li>
        <li>
          <a onClick={() => toggleTheme("system")}>
            <Laptop /> System
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
