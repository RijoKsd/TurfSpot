import { createBrowserRouter } from "react-router-dom";

 import Home from "@pages/Home.jsx";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";

//  all the components that are used in the layout
import {AdminLayout,
OwnerLayout,
GuestLayout} from "@layouts"
 
import OwnerDashboard from "./components/owner/Dashboard/OwnerDashboard.jsx";

//  all the components that are used in the owner dashboard
import {AddTurf} from "@components/owner"

//  all the components that are used in the admin dashboard
import {
  UserManagement,
  NewOwnerRequests,
  RejectedOwnerRequests,
  AdminDashboard,
} from "@components/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "owner-requests",
        children: [
          { path: "new", element: <NewOwnerRequests /> },
          { path: "rejected", element: <RejectedOwnerRequests /> },
        ],
      },
      { path: "users", element: <UserManagement /> },
      // { path: 'owners', element: <OwnersPage /> },
      // { path: 'turfs', element: <TurfsPage /> },
      // { path: 'transactions', element: <TransactionsPage /> },
    ],
  },
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { path: "", element: <OwnerDashboard /> },
      { path: "add-turf", element: <AddTurf /> },
      // { path: 'turfs', element: <MyTurfsPage /> },
      // { path: 'reviews', element: <ReviewsPage /> },
      // { path: 'bookings', element: <BookingsPage /> },
    ],
  },
]);

export default router;
