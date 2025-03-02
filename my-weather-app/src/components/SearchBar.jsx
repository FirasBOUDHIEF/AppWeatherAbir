import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  return (
    <div className="d-flex justify-content-center my-4">
      <input
        className="form-control w-50 shadow"
        placeholder="🌍 Rechercher une ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-info ms-2" onClick={() => onSearch(city)}>
        🔍 Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
