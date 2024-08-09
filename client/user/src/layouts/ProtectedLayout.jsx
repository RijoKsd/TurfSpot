import { Navigate, Outlet } from "react-router-dom";
import AuthNavbar from "../components/auth/AuthNavbar";
import {useSelector} from "react-redux"

 

export default function ProtectedLayout() {
  const {isLoggedIn} = useSelector(state=> state.auth)
  if(!isLoggedIn){
    return <Navigate to= "/login" replace />
   }

  return (
    <div className="flex flex-col min-h-screen ">
      <AuthNavbar />
      <main className="flex-grow pt-16 ">
        <Outlet />
      </main>
    </div>
  );
}
