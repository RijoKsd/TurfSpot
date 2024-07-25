import { createBrowserRouter } from "react-router-dom";
import Root from  "./layouts/Root"
import Home from "./pages/Home";
 
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
    ],
  },
]);

export default router;