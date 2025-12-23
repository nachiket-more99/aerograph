import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

// URL for fetching US states geography data
const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

/**
 * Function for rendering a map of the United States with airport markers.
 * @param {Array} markersData - Data containing airport markers with code, city, and coordinates.
 */
const UsAirportMap = ({ markersData }) => {
  return (
    <div style={{ height: '100%', width: 'fit-content', margin: '0 auto' }}>
      <ComposableMap
        style={{ width: 'auto', height: '100%' }}
        projection='geoAlbersUsa'
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
{geographies.map((geo) => (
  <Geography
    key={geo.rsmKey}
    stroke='#f5f4f1'
    geography={geo}
    fill='#e8e6e0'
    style={{
      default: { outline: 'none' },
      hover: { fill: '#d1cfe9', outline: 'none' },
      pressed: { outline: 'none' },
    }}
  />
))}

{markersData.map(({ code, city, coordinates }) => {
  if (!coordinates || coordinates[0] == null || coordinates[1] == null) return null;
  return (
    <Tooltip key={code} title={city} placement='top'>
      <Marker coordinates={coordinates}>
        <circle r={4} fill='#011638' stroke='#011638' strokeWidth={1.5} />
      </Marker>
    </Tooltip>
  );
})}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default UsAirportMap;
