import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { setTheme } from "../../redux/slices/themeSlice";

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.current);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
