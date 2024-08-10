import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import AddTurf from "./pages/owner/AddTurf";
import AdminLayout from "./layouts/AdminLayout";
import OwnerLayout from "./layouts/OwnerLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerRequests from "./components/admin/OwnerRequests";
import UserManagement from "./components/admin/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
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
      { path: "owner-requests", element: <OwnerRequests /> },
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
