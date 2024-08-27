import { PackageOpen } from "lucide-react";
import useTurfData from "@hooks/admin/useTurf";
import Turf from "./Turf";
import TurfSkeleton from "./TurfSkeleton";

export const AllTurf = () => {
  const { turfData, loading } = useTurfData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <TurfSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!turfData || turfData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-base-200 rounded-lg">
        <PackageOpen size={64} className="text-gray-400 mb-4" />
        <p className="text-xl font-semibold text-gray-600">
          No turfs available
        </p>
        <p className="text-gray-500 mt-2">Check back later for new turfs!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {turfData.map((turf) => (
        <Turf key={turf._id} turf={turf} />
      ))}
    </div>
  );
};

export default AllTurf;
