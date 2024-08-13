import React from "react";
import {
  Users,
  Building,
  MapPin,
  CreditCard,
  UserPlus,
  UserX,
  TrendingUp,
} from "lucide-react";

const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[Users, Building, MapPin, CreditCard].map((Icon, index) => (
            <SkeletonCard key={index} Icon={Icon} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {[UserPlus, UserX, TrendingUp].map((Icon, index) => (
            <SkeletonCard key={index} Icon={Icon} />
          ))}
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Booking History</h2>
            <div className="flex justify-end mb-4">
              <div className="w-48 h-10 bg-base-300 rounded animate-pulse"></div>
            </div>
            <div className="h-64 bg-base-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = ({ Icon }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <div className="flex justify-between items-center">
        <div className="w-24 h-4 bg-base-300 rounded animate-pulse"></div>
        <Icon className="h-6 w-6 text-base-300" />
      </div>
      <div className="w-16 h-8 bg-base-300 rounded animate-pulse mt-2"></div>
    </div>
  </div>
);

export default AdminDashboardSkeleton;
