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
                  stroke='#fff'
                  geography={geo}
                  fill='#e6e6e6'
                />
              ))}

              {markersData.map(({ code, city, coordinates }) => {
                return (
                  <Tooltip key={code} title={city} placement='top'>
                    <Marker
                      key={code}
                      coordinates={coordinates}
                      data-tip={code}
                      data-for={`tooltip-${code}`}
                    >
                      <circle
                        r={3}
                        fill='#011638'
                        stroke='#011638'
                        strokeWidth={2}
                      />
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
