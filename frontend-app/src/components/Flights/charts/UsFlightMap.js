import React, { useState, useContext, useEffect, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { DataContext } from '../../../context/DataContext';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const UsGeoMap = ({
  selectedAirline,
  selectedOrigin,
  flightValues,
  flightOriginsData,
}) => {
  // Context for accessing shared data
  const data = useContext(DataContext);

  // States for holding data
  const [airlinesData, setAirlinesData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [airportsData, setAirportsData] = useState(null);
  const [routesData, setRoutesData] = useState(null);
  const [markersData, setMarkersData] = useState(null);
  const [routesTable, setRoutesTable] = useState([]);
  const [, setFlightOrigins] = useState({});
  const [selectedRoute, setSelectedRoute] = useState({});
  const [updateKey, setUpdateKey] = useState(0);

  // Function to handle setting routes
  const handleSetRoutes = useCallback(
    (selectedItem) => {
      // Extracting airline code based on selected item
      const airlineCode = airlinesData.find(
        (airline) => airline.AIRLINE === selectedItem
      ).IATA_CODE;

      // Filtering flights data based on the selected airline
      const airlineFlights = flightsData.filter(
        (flights) => flights.AIRLINE === airlineCode
      );

      // Mapping flights data to a more usable format (routes)
      const routes = airlineFlights.map(
        ({ ORIGIN_AIRPORT, DESTINATION_AIRPORT }) => ({
          dep_code: ORIGIN_AIRPORT,
          dep:
            airportsData.find((airport) => airport.IATA_CODE === ORIGIN_AIRPORT)
              ?.CITY || ORIGIN_AIRPORT,
          arr_code: DESTINATION_AIRPORT,
          arr:
            airportsData.find(
              (airport) => airport.IATA_CODE === DESTINATION_AIRPORT
            )?.CITY || DESTINATION_AIRPORT,
        })
      );

      // Extracting unique origins for flight origins data
      const origins = new Set(routes.map((obj) => obj.dep));
      setFlightOrigins(origins);
      flightOriginsData(origins);

      // Mapping routes data for table display
      const flightRows = routes.map((item) =>
        createData(item.dep, item.dep_code, item.arr, item.arr_code)
      );
      setRoutesTable(flightRows);

      // Mapping markers data for map display
      const markers = Array.from(
        new Set(routes.flatMap((route) => [route.dep, route.arr]))
      ).map((city) => {
        const airport = airportsData.find((airport) => airport.CITY === city);
        return airport
          ? {
              markerOffset: 1,
              code: airport.IATA_CODE,
              city,
              coordinates: [airport.LONGITUDE, airport.LATITUDE],
            }
          : null;
      });

      setRoutesData(routes);
      setMarkersData(markers);

      // Passing flight values to parent component
      flightValues({
        total_flights: routes.length,
        total_origins: new Set(routes.map((obj) => obj.dep)).size,
        total_dest: new Set(routes.map((obj) => obj.arr)).size,
      });
    },
    [airlinesData, airportsData, flightOriginsData, flightValues, flightsData]
  );

  // Effect to handle setting routes when data is ready
  useEffect(() => {
    if (airportsData && flightsData && airlinesData) {
      handleSetRoutes(selectedAirline);
    }
  }, [
    airportsData,
    flightsData,
    airlinesData,
    handleSetRoutes,
    selectedAirline,
  ]);

  // Effect to set data when it becomes available
  useEffect(() => {
    if (
      data.airportsData != null &&
      data.flightsData != null &&
      data.airlinesData != null
    ) {
      setAirlinesData(data.airlinesData);
      setFlightsData(data.flightsData);
      setAirportsData(data.airportsData);
    }
  }, [data]);

  // Function to create data for table rows
  function createData(Origin, Origin_Code, Dest, Dest_Code) {
    return { Origin, Origin_Code, Dest, Dest_Code };
  }

  // Function to handle selecting a flight and updating selected route
  const handleSelectFlight = (event, rowData) => {
    setSelectedRoute({
      dep: markersData.find((marker) => marker.city === rowData.Origin)
        .coordinates,
      arr: markersData.find((marker) => marker.city === rowData.Dest)
        .coordinates,
    });
  };

  // Effect to update key for triggering re-render
  useEffect(() => {
    setUpdateKey((prev) => prev + 1)
  }, [selectedRoute, updateKey]);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {markersData != null && (
        <ComposableMap
          style={{ width: '100%', height: '100%' }}
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

                {routesData.map((route) => {
                  var from = null;
                  var to = null;

                  if (route.dep === selectedOrigin) {
                    from = markersData.find(
                      (marker) => marker.city === selectedOrigin
                    );
                    to = markersData.find(
                      (marker) => marker.city === route.arr
                    );
                    return (
                      <Line
                        key={updateKey}
                        from={from.coordinates}
                        to={to.coordinates}
                        stroke='#9055A2'
                        strokeWidth={2}
                        strokeLinecap='round'
                      />
                    );
                  }
                  return null;
                })}

                {markersData.map(({ code, city, coordinates }) => {
                  return (
                    <Tooltip key={city} title={city} placement='top'>
                      <Marker
                        key={city}
                        coordinates={coordinates}
                        data-tip={code}
                        data-for={`tooltip-${city}`}
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
      )}

      <div className='card-container flights-list-card'>
        <div className='flights-list'>
          {routesTable.length > 1 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 0 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' style={{ minWidth: 0 }}>
                      ORIGIN
                    </TableCell>
                    <TableCell align='center' style={{ minWidth: 0 }}>
                      DESTINATION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routesTable.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={(event) => handleSelectFlight(event, row)}
                    >
                      <TableCell align='center' style={{ minWidth: 0 }}>
                        {row.Origin}
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 0 }}>
                        {row.Dest}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsGeoMap;
