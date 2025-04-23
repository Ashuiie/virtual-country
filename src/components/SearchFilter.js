// src/components/SearchFilter/SearchFilter.js
import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({ 
  searchTerm, 
  selectedRegion, 
  selectedPopulation,
  onSearchChange, 
  onRegionChange,
  onPopulationChange 
}) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const populationRanges = [
    { label: 'All', value: 'all' },
    { label: 'Less than 1M', value: '<1M' },
    { label: '1M - 10M', value: '1M-10M' },
    { label: '10M - 50M', value: '10M-50M' },
    { label: '50M - 100M', value: '50M-100M' },
    { label: 'More than 100M', value: '>100M' }
  ];

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="filter-group">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Region</option>
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select
          value={selectedPopulation}
          onChange={(e) => onPopulationChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Population</option>
          {populationRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;

