import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/GuestNavbar";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <PublicNavbar />
      <main className="flex-grow pt-16 ">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
