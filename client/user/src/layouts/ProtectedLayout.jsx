import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/auth/AuthNavbar";

 

export default function ProtectedLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <AuthNavbar />
      <main className="flex-grow pt-16 ">
        <Outlet />
      </main>
    </div>
  );
}
