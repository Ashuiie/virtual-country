import React from 'react';
import Flag from './Flag';
import Borders from './Borders';

function CountryDetails({ country }) {
  if (!country) return <p className="p-4">Loading country details...</p>;

  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    latlng,
    borders,
    timezones,
    currencies,
    languages,
    flags
  } = country;

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white shadow rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">{name.common}</h2>
      <Flag flagUrl={flags.svg} name={name.common} />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
        <li><strong>Capital:</strong> {capital?.join(', ')}</li>
        <li><strong>Region/Subregion:</strong> {region} / {subregion}</li>
        <li><strong>Population:</strong> {population.toLocaleString()}</li>
        <li><strong>Area:</strong> {area.toLocaleString()} km²</li>
        <li><strong>Coordinates:</strong> {latlng.join(', ')}</li>
        <li><strong>Timezones:</strong> {timezones.join(', ')}</li>
        <li><strong>Currency:</strong> {Object.values(currencies || {}).map(cur => cur.name).join(', ')}</li>
        <li><strong>Languages:</strong> {Object.values(languages || {}).join(', ')}</li>
      </ul>

      <div className="mt-4">
        <Borders borders={borders} />
      </div>
    </section>
  );
}

export default CountryDetails;
