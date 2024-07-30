import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Button from "../components/Button";
import Footer from "../components/Footer";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/TurfCard";
import TurfCardSkeleton from "../components/TurfCardSkeleton";

import bg from "/r.png";
import bg2 from "/bg.jpeg";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const slides = [bg, bg2, bg];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <Carousel slides={slides} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold">Welcome to TurfSpot</h1>
            <p className="py-6">
              Discover and book the best turf fields in your area. Whether
              you&#39;re planning a casual game or a tournament, TurfSpot has
              got you covered.
            </p>
            <Link
              to={isLoggedIn ? "/auth/turfs" : "/turfs"}
              className="btn btn-accent"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 px-12">
        <h2 className="text-3xl font-bold mb-6">Featured Turfs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TurfCardSkeleton key={`skeleton-${index}`} />
              ))
            : turfs
                .slice(0, 3)
                .map((turf) => <TurfCard key={turf._id} turf={turf} />)}
        </div>
        <div className="text-center mt-8">
          <Link
            to={isLoggedIn ? "/auth/turfs" : "/turfs"}
            className="btn btn-primary"
          >
            View More Turfs
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
