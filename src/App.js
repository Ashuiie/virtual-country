
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchFilter from './components/SearchFilter';
import CountryDetails from './components/CountryDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPopulation, setSelectedPopulation] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filterByPopulation = (country) => {
    const population = country.population;
    switch (selectedPopulation) {
      case '<1M':
        return population < 1000000;
      case '1M-10M':
        return population >= 1000000 && population < 10000000;
      case '10M-50M':
        return population >= 10000000 && population < 50000000;
      case '50M-100M':
        return population >= 50000000 && population < 100000000;
      case '>100M':
        return population >= 100000000;
      default:
        return true;
    }
  };

  const filteredCountries = countries.filter(country => {;
    const matchesSearch = country.name.common.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || 
      country.region === selectedRegion;
    const matchesPopulation = filterByPopulation(country);
    return matchesSearch && matchesRegion && matchesPopulation;
  })
  .sort((b, a) => b.name.common.localeCompare(a.name.common));

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <SearchFilter
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            selectedPopulation={selectedPopulation}
            onSearchChange={setSearchTerm}
            onRegionChange={setSelectedRegion}
            onPopulationChange={setSelectedPopulation}
          />
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={<CountryDetails countries={filteredCountries} />} 
              />
              <Route 
                path="/country/:name" 
                element={<CountryDetails countries={countries} />} 
              />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
