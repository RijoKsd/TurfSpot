import React from "react";
import OwnerCard from "./OwnerCard";

const OwnerList = ({ owners }) => {
  return (
    <> 
      {owners.length === 0 && (
        <div className="alert alert-info shadow-lg w-full">
          <div>
            <span>No owners at the moment.</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {owners.map((owner) => (
          <OwnerCard key={owner._id} owner={owner} />
        ))}
      </div>
    </>
  );
};

export default OwnerList;


