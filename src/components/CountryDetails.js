import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetails.css';

const CountryDetails = ({ countries }) => {
  const { name } = useParams();
  const decodedName = name ? decodeURIComponent(name) : null;

  if (!Array.isArray(countries)) {
    return <p>No data available.</p>;
  }

  // Single country detail (route: /country/:name)
  const country = decodedName
    ? countries.find(c => c.name.common.toLowerCase() === decodedName.toLowerCase())
    : null;

  if (name && !country) {
    return <div>Country not found</div>;
  }

  // Country list (route: /)
  if (!name) {
    return (
      <div className="countries-grid">
        {countries.map(country => (
          <Link 
            to={`/country/${encodeURIComponent(country.name.common)}`} 
            key={country.cca3}
            className="country-card"
          >
            <img 
              src={country.flags?.png} 
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <div className="country-info">
              <h2>{country.name.common}</h2>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Detailed country view
  return (
    <div className="country-detail-page">
      <Link to="/" className="back-button">← Back</Link>
      <div className="country-detail-content">
        <img 
          src={country.flags?.svg} 
          alt={`Flag of ${country.name.common}`}
          className="country-detail-flag"
        />
        <div className="country-detail-info">
          <h1>{country.name.common}</h1>
          <div className="info-grid">
            <div>
              <p><strong>Native Name:</strong> {
                Object.values(country.name.nativeName || {})[0]?.common || 'N/A'
              }</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Area:</strong> {country.area?.toLocaleString() || 'N/A'} km²</p>
            </div>
            <div>
              <p><strong>Coordinates:</strong> {country.latlng?.join(', ') || 'N/A'}</p>
              <p><strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
              <p><strong>Currencies:</strong> {
                Object.values(country.currencies || {})
                  .map(c => `${c.name} (${c.symbol})`)
                  .join(', ') || 'N/A'
              }</p>
              <p><strong>Languages:</strong> {
                Object.values(country.languages || {}).join(', ') || 'N/A'
              }</p>
              <p><strong>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}</p>
            </div>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <strong>Border Countries:</strong>
              <div className="border-buttons">
                {country.borders.map(border => {
                  const borderCountry = countries.find(c => c.cca3 === border);
                  return borderCountry && (
                    <Link 
                      to={`/country/${encodeURIComponent(borderCountry.name.common)}`}
                      key={border}
                      className="border-button"
                    >
                      {borderCountry.name.common}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
