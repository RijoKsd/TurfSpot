import { createBrowserRouter } from "react-router-dom";
import Root from  "./layouts/Root"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;