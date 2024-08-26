 import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 mb-8">Oops! Page not found</p>
        <p className="text-lg mb-8">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        <Link to={isLoggedIn ? "/auth": "/"} className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
