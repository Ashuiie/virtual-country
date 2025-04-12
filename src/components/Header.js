// src/components/Header.js
import React from 'react';

function Header({ countries, setSelectedCountry }) {
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    const country = countries.find(c => c.name.common.toLowerCase().includes(input));
    if (country) setSelectedCountry(country);
  };

  const handleFilter = (e) => {
    const region = e.target.value;
    const country = countries.find(c => c.region === region);
    if (country) setSelectedCountry(country);
  };

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center flex-wrap gap-2">
      <h1 className="text-xl font-bold">Country Info Viewer</h1>
      <input
        type="text"
        placeholder="Search Country..."
        className="p-2 rounded text-black"
        onChange={handleSearch}
      />
      <select onChange={handleFilter} className="p-2 rounded text-black">
        <option value="">Filter by Region</option>
        {[...new Set(countries.map(c => c.region))].map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    </header>
  );
}

export default Header;
