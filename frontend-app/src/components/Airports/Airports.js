import React, { useEffect, useState, useContext } from 'react';
import './Airports.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import { DataContext } from '../../context/DataContext';
import UsAirportMap from './charts/UsAirportMap';
import AirportsPieChart from './charts/AirportsPieChart';

const Airports = () => {
  // Using context to get data
  const data = useContext(DataContext);

  // States for data management
  const [, setAirlinesData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [airportsData, setAirportsData] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [key, setKey] = useState(0);
  const [markersData, setMarkersData] = useState([]);

  // Fetch and set data from context
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

  // State for selected US state 'WA'
  const [selectedState, setSelectedState] = useState('WA');

  // Handle change of selected state
  const handleSelectedState = (selectedItem) => {
    setSelectedState(selectedItem);
  };

  // Fetch and set marker data and traffic data based on selected state
  useEffect(() => {
    const handlesetMarkers = (selectedItem) => {
      const markers = airportsData
        .filter((airport) => airport.STATE === selectedItem)
        .map((airport) => ({
          markerOffset: 0,
          code: airport.IATA_CODE,
          city: airport.CITY,
          coordinates: [airport.LONGITUDE, airport.LATITUDE],
        }));

      setMarkersData(markers);
    };

    const getTrafficData = (selectedState) => {
      const filteredAirports = airportsData
        .filter((airport) => airport.STATE === selectedState)
        .map(({ CITY, IATA_CODE }) => ({ city: CITY, code: IATA_CODE }));

      const result = [['City', 'Traffic']].concat(
        filteredAirports.map(({ city, code }) => {
          const depCount = flightsData.filter(
            (flight) => flight.ORIGIN_AIRPORT === code
          ).length;
          const arrCount = flightsData.filter(
            (flight) => flight.DESTINATION_AIRPORT === code
          ).length;

          const traffic = depCount + arrCount;

          return [city, traffic];
        })
      );

      setTrafficData(result);
    };

    if (airportsData != null) {
      handlesetMarkers(selectedState);
      getTrafficData(selectedState);
    }
  }, [selectedState, airportsData, flightsData]);

  // Increment key for components that rely on it
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [markersData]);

  return (
    <div className='page-container airports-container'>
      <div className='top'>
        {/* Card for displaying airport distribution */}
        <div className='card-container airports-map-card'>
          <div>
            <div className='card-title'>Airport Distribution</div>
            {/* Dropdown for selecting US state */}
            {airportsData != null && (
              <Dropdown onSelect={handleSelectedState}>
                <Dropdown.Toggle className='btn-primary' id='dropdown-basic'>
                  {selectedState}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Display unique US states */}
                  {[
                    ...new Set(airportsData.map((airport) => airport.STATE)),
                  ].map((item, index) => (
                    <Dropdown.Item key={index} eventKey={item} href=''>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {/* Display map with airport markers */}
          <div className='airports-map'>
            <UsAirportMap markersData={markersData} key={key} />
          </div>
        </div>

        {/* Card for displaying cities with busiest airports */}
        <div className='card-container busiest-airports-card'>
          <div className='card-title'>Cities with Busiest Airports</div>
          <div className='busiest-airports'>
            {/* Display pie chart */}
            {trafficData.length !== 0 && (
              <AirportsPieChart
                trafficData={trafficData}
                styled={{
                  height: '100%',
                  width: 'fit-content',
                  margin: '0 auto',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Card for displaying list of airports */}
      <div className='bottom'>
        <div className='card-container airports-list-card'>
          <div className='airports-list'>
            {/* Display table of airports */}
            {airportsData != null && (
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
                      <TableCell align='center' style={{ minWidth: 0 }}>
                        CITY
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 0 }}>
                        STATE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Display rows of airport data */}
                    {airportsData.map((row) => (
                      <TableRow
                        key={row.AIRPORT}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align='center' style={{ minWidth: 0 }}>
                          {row.IATA_CODE}
                        </TableCell>
                        <TableCell align='center' style={{ minWidth: 0 }}>
                          {row.AIRPORT}
                        </TableCell>
                        <TableCell align='center' style={{ minWidth: 0 }}>
                          {row.CITY}
                        </TableCell>
                        <TableCell align='center' style={{ minWidth: 0 }}>
                          {row.STATE}
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
    </div>
  );
};

export default Airports;
