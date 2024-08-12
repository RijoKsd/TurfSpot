 import  useOwners  from "@hooks/admin/useOwners";
import OwnerList from "./OwnerList";
import SearchBar from "./SearchBar";
import OwnersSkeleton from "./OwnersSkeleton";

const OwnerViewer = () => {
  const { owners, loading, searchTerm, handleSearch } = useOwners();

 
  if (loading) return <OwnersSkeleton />;

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Owner Viewer</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <OwnerList owners={owners} />
    </div>
  );
};

export default OwnerViewer;
