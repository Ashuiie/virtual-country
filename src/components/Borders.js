import React from 'react';

function Borders({ borders }) {
  if (!borders || borders.length === 0) {
    return <p><strong>Borders:</strong> None</p>;
  }

  return (
    <div>
      <strong>Borders:</strong>
      <ul className="list-disc list-inside ml-4 mt-1">
        {borders.map((border, idx) => (
          <li key={idx}>{border}</li>
        ))}
      </ul>
    </div>
  );
}

export default Borders;
