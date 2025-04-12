// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryDetails from './components/CountryDetails';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        const afghanistan = response.data.find(country => country.name.common === 'Afghanistan');
        setSelectedCountry(afghanistan);
      })
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header countries={countries} setSelectedCountry={setSelectedCountry} />
        <main className="container">
          <Routes>
            <Route path="/" element={<CountryDetails country={selectedCountry} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
