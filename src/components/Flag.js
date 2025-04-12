import React from 'react';

function Flag({ flagUrl, name }) {
  return (
    <div className="my-4">
      <img
        src={flagUrl}
        alt={`${name} flag`}
        className="w-48 h-auto shadow rounded border"
      />
    </div>
  );
}

export default Flag;
