import   { useState } from "react";

const SearchTurf = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl ml-auto mb-8 ">
      <input
        type="text"
        placeholder="Search for turfs..."
        className="input input-bordered w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ml-2">
        Search
      </button>
    </form>
  );
};

export default SearchTurf;
