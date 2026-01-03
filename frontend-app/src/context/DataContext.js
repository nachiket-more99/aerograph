import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [airlinesData, setAirlinesData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  const [airportsData, setAirportsData] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/airlines/all`)
      .then((response) => setAirlinesData(response.data))
      .catch((error) => console.error('Error fetching airlines data:', error));

    axios.get(`${BASE_URL}/flights/all`)
      .then((response) => setFlightsData(response.data))
      .catch((error) => console.error('Error fetching flights data:', error));

    axios.get(`${BASE_URL}/airports/all`)
      .then((response) => setAirportsData(response.data))
      .catch((error) => console.error('Error fetching airports data:', error));
  }, []);

  return (
    <DataContext.Provider value={{ airlinesData, airportsData, flightsData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };