// src/hooks/useCountries.js
import { useState, useEffect } from 'react';
import { getCountries, getCountryByName, getCountryByCode } from '../services/api';

export const useCountries = (initialCountry = 'Afghanistan') => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getCountries();
        setCountries(data);
        setFilteredCountries(data);
        
        // Get initial country data
        const countryData = await getCountryByName(initialCountry);
        setSelectedCountry(countryData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, [initialCountry]);

  const selectCountry = async (name) => {
    try {
      setLoading(true);
      const countryData = await getCountryByName(name);
      setSelectedCountry(countryData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const selectCountryByCode = async (code) => {
    try {
      setLoading(true);
      const countryData = await getCountryByCode(code);
      setSelectedCountry(countryData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterByRegion = (region) => {
    if (region === 'All') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country => country.region === region);
      setFilteredCountries(filtered);
    }
  };

  const filterByPopulation = (min, max) => {
    const filtered = countries.filter(
      country => country.population >= min && country.population <= max
    );
    setFilteredCountries(filtered);
  };

  const searchCountries = (query) => {
    if (!query) {
      setFilteredCountries(countries);
      return;
    }
    
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      (country.name.official && country.name.official.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredCountries(filtered);
  };

  return {
    countries,
    filteredCountries,
    selectedCountry,
    loading,
    error,
    selectCountry,
    selectCountryByCode,
    filterByRegion,
    filterByPopulation,
    searchCountries
  };
};