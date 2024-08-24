import React from "react";
import { Mail, Calendar } from "lucide-react";
import { format } from "date-fns";
import Avatar from "react-avatar";

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-100 shadow-xl  ">
      <div className="card-body">
        <div className="flex items-center mb-4">
          <div className="avatar placeholder mr-4">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12 ">
              <Avatar name={user.name} size={40} round={true} />
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
  );
};

export default UserCard;
