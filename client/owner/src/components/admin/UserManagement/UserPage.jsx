import React from "react";
import useUsers from "@hooks/admin/useUsers";
import UserSkeleton from "./UserSkeleton";
import UserCard from "./UserCard";
import SearchInput from "./SearchInput";

const UserPage = () => {
  const { users, loading, searchTerm, handleSearch } = useUsers();

  if (loading) return <UserSkeleton />;

  return (
    <div className="container mx-auto p-2  ">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        User Management
      </h1>
      <SearchInput
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      {users.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No users found matching your search.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
