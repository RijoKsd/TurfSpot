import { createBrowserRouter } from "react-router-dom";
import Root from  "./layouts/Root"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Turf from "./components/Turf";
import TurfDetails from "./components/TurfDetails";
import BecomeOwner from "./components/BecomeOwner";
 
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
      {
        path:"turfs",
        element:<Turf />
      },{
        path:"turf/:id",
        element:<TurfDetails />
      },{
        path:"become-owner",
        element:<BecomeOwner />
      }
    ],
  },
]);

export default router;