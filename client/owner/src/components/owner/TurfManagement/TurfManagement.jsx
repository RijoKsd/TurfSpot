import React, { useEffect, useState } from "react";
 
import useTurfManagement from "@hooks/owner/useTurfManagement";
import EditTurfForm from "./EditTurfForm";
import TurfCardSkeleton from "./TurfCardSkeleton";
import TurfCard from "./TurfCard";

const TurfManagement = () => {
  const { turfs, isLoading, error, fetchTurfs, editTurf, deleteTurf } =
    useTurfManagement();
  const [editingTurf, setEditingTurf] = useState(null);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleEdit = (turf) => {
    setEditingTurf(turf);
  };

  const handleSaveEdit = (updatedTurf) => {
    editTurf(updatedTurf);
    setEditingTurf(null);
  };

  const handleCancelEdit = () => {
    setEditingTurf(null);
  };

  if (error) {
    return <div className="text-error text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Turf Management</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <TurfCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turfs.map((turf) => (
            <div key={turf.id}>
              {editingTurf && editingTurf.id === turf.id ? (
                <EditTurfForm
                  turf={editingTurf}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <TurfCard
                  turf={turf}
                  onEdit={() => handleEdit(turf)}
                  onDelete={() => deleteTurf(turf.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfManagement;
