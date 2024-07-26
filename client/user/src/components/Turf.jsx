import TurfCard from "./TurfCard";
import TurfCardSkeleton from "./TurfCardSkeleton";
import useTurfData from "../hooks/useTurfData";
 
const Turf = () => {
  const { turfs, loading, error } = useTurfData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12 ">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <TurfCardSkeleton key={`skeleton-${index}`} />
          ))
        : turfs.map((turf) => <TurfCard key={turf._id} turf={turf} />)}
    </div>
  );
};

export default Turf;
