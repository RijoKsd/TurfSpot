import React from "react";
import {  Mail, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import useUsers from "../../hooks/admin/useUsers";
import UserSkeleton from "./UserSkeleton";
import Avatar from "react-avatar";

const UserPage = () => {
  const { users, loading,  searchTerm, handleSearch } = useUsers();

  if (loading) return <UserSkeleton />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        User Management
      </h1>
      <div className="form-control w-full max-w-xs ml-auto mb-6">
        <label className="label">
          <span className="label-text">Search users</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-full pr-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      {users.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No users found matching your search.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar placeholder mr-4">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                      {/* <span className="text-xl ">
                        {user.name.charAt(0).toUpperCase()}
                      </span> */}
                      <Avatar name={user.name} size={40} round={true}  />
                    </div>
                  </div>
                  <h2 className="card-title">{user.name}</h2>
                </div>
                <p className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2" />
                  {user.email}
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
