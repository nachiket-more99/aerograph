import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [airlinesData, setAirlinesData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);
  
  const [airportsData, setAirportsData] = useState(null);

  useEffect(() => {
    // Fetch data from your API here
    const fetchAirlineData = async () => {
      axios.get('http://localhost:5000/airlines/all')
      .then((response) => {
        setAirlinesData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching airlines data:', error);
      });
    };

    
    const fetchFlightData = async () => {
      axios.get('http://localhost:5000/flights/all')
      .then((response) => {
        setFlightsData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching flights data:', error);
      });
    };

    
    const fetchAirportData = async () => {
      axios.get('http://localhost:5000/airports/all')
      .then((response) => {
        setAirportsData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching airports data:', error);
      });
    };

    fetchAirlineData();
    fetchFlightData();
    fetchAirportData();
  }, []); // Empty dependency array ensures the effect runs only once

  return <DataContext.Provider value={{airlinesData, airportsData, flightsData}}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
