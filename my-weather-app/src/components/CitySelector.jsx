import React, { useState } from "react";

const CitySelector = ({ onCitySelect }) => {
  const [city, setCity] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Entrez une ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => onCitySelect(city)}>🔍 Rechercher</button>
    </div>
  );
};

export default CitySelector;
