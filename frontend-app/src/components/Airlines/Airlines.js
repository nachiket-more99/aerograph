import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Airlines.css';
import AirlinesPieChart from './charts/AirlinesPieChart';
import AirlinesBarChart from './charts/AirlinesBarChart';
import AirlinesHistory from './charts/AirlinesHistory';
import Dropdown from 'react-bootstrap/Dropdown';
import { DataContext } from '../../context/DataContext';

const Airlines = () => {
  // Context and state hooks
  const data = useContext(DataContext);
  const [airlinesData, setAirlinesData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);

  // Effect to update local state when data changes
  useEffect(() => {
    if (data.flightsData != null && data.airlinesData != null) {
      setAirlinesData(data.airlinesData);
      setFlightsData(data.flightsData);
    }
  }, [data]);

  // State hooks for selected items
  const [selectedAirline, setSelectedAirline] = useState();
  const [airlineCount, setAirlineCount] = useState([]);
  const [flightsBarData, setFlightsBarData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  // Finding IATA_CODE of selected airline name and calling handleHistoryData to get all the data for that airline
  const handleSelectedAirline = (selectedItem) => {
    setSelectedAirline(selectedItem);
    const airlineCode = airlinesData.find(
      (airline) => airline.AIRLINE === selectedItem
    ).IATA_CODE;

    setHistoryData(handleHistoryData(airlineCode));
  };

  // Takes flights & airines data states and creates new object array {AIRLINE, count, Name} for AirlinesPieChart.js
  const handlePieData = useCallback(() => {
    const airlineCount = flightsData.reduce((resultArray, flight) => {
      const airline = airlinesData.find((a) => a.IATA_CODE === flight.AIRLINE);
      if (airline) {
        const existingIndex = resultArray.findIndex(
          (entry) => entry.AIRLINE === airline.IATA_CODE
        );
        if (existingIndex !== -1) {
          resultArray[existingIndex].count += 1;
        } else {
          resultArray.push({
            AIRLINE: airline.IATA_CODE,
            count: 1,
            Name: airline.AIRLINE,
          });
        }
      }
      return resultArray;
    }, []);

    return airlineCount;
  }, [airlinesData, flightsData]);

  // Takes flights data states and creates new object array {AIRLINE, DEPARTURE_DELAY, ARRIVAL_DELAY} for AirlinesBarChart.js
  const handleBarData = useCallback(() => {
    const groupedData = flightsData.reduce((acc, flight) => {
      const existingEntry = acc.find(
        (entry) => entry.AIRLINE === flight.AIRLINE
      );

      if (existingEntry) {
        existingEntry.DEPARTURE_DELAY += flight.DEPARTURE_DELAY || 0;
        existingEntry.ARRIVAL_DELAY += flight.ARRIVAL_DELAY || 0;
      } else {
        acc.push({
          AIRLINE: flight.AIRLINE,
          DEPARTURE_DELAY: flight.DEPARTURE_DELAY || 0,
          ARRIVAL_DELAY: flight.ARRIVAL_DELAY || 0,
        });
      }

      return acc;
    }, []);

    return groupedData;
  }, [flightsData]);

  // Takes flights data states and creates new object array {AIRLINE, DEPARTURE_DELAY, ARRIVAL_DELAY} for AirlinesHistory.js
  const handleHistoryData = useCallback(
    (iata_code) => {
      return flightsData
        .filter((flight) => flight.AIRLINE === iata_code)
        .map(({ AIRLINE, DEPARTURE_DELAY, ARRIVAL_DELAY }) => {
          // Check if both delay values are defined
          if (
            typeof DEPARTURE_DELAY === 'number' &&
            typeof ARRIVAL_DELAY === 'number'
          ) {
            return {
              AIRLINE,
              DEPARTURE_DELAY,
              ARRIVAL_DELAY,
            };
          }

          return null;
        })
        .filter((flight) => flight !== null);
    },
    [flightsData]
  );

  // Effect to update charts when data changes
  useEffect(() => {
    if (airlinesData != null && flightsData != null) {
      setSelectedAirline(
        airlinesData.length > 0 ? airlinesData[0].AIRLINE : ''
      );

      var airlineCount = handlePieData();

      setAirlineCount((prevAirlineCount) => [
        ...prevAirlineCount,
        ...airlineCount,
      ]);

      setFlightsBarData(handleBarData());

      setHistoryData(handleHistoryData('UA'));
    }
  }, [
    airlinesData,
    flightsData,
    handleBarData,
    handleHistoryData,
    handlePieData,
  ]);

  useEffect(() => {}, [airlineCount]);

  return (
    <div>
      {airlinesData != null && (
        <div className='page-container airlines-container'>
          <div className='top'>
            {/* Flights by Airlines Card */}
            <div className='card-container airlines-card'>
              <div className='card-title'>Flights by Airlines</div>
              <div className='airlines'>
                {airlineCount.length > 1 && (
                  <AirlinesPieChart data={airlineCount} />
                )}
              </div>
            </div>

            {/* Airlines Delays Card */}
            <div className='card-container airline-delays-card'>
              <div className='card-title'>Airlines Delays</div>
              <div className='airline-delays'>
                {airlineCount.length > 1 && (
                  <AirlinesBarChart data={flightsBarData} />
                )}
              </div>
            </div>
          </div>

          {/* Historical Performance of Airline Card */}
          <div className='bottom'>
            <div className='card-container history-card'>
              <div>
                <div className='card-title'>
                  Historical Performance of Airline
                </div>
                <Dropdown onSelect={handleSelectedAirline}>
                  <Dropdown.Toggle className='btn-primary' id='dropdown-basic'>
                    {selectedAirline}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[
                      ...new Set(airlinesData.map((flight) => flight.AIRLINE)),
                    ].map((item, index) => (
                      <Dropdown.Item key={index} eventKey={item} href=''>
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className='history-delays'>
                {historyData.length > 1 && (
                  <AirlinesHistory data={historyData} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Airlines;
