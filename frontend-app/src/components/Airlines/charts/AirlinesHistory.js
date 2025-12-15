import React from 'react';
import { Chart } from 'react-google-charts';

// Options configuration for the line chart
export const lineChartOptions = {
  curveType: 'function',
  legend: { position: 'top', textStyle: { color: '#888', fontSize: 11 } },
  colors: ['#a78bfa', '#fca5a5'],
  backgroundColor: 'transparent',
  fontName: 'DM Sans',
  hAxis: { textPosition: 'none' },
  vAxis: {
    textStyle: { color: '#888', fontSize: 10 },
    gridlines: { color: '#f0eeea' },
    viewWindow: { max: 350 },
  },
  chartArea: { width: '90%', height: '75%' },
};

// Functional component for displaying airlines history using a line chart
const AirlinesHistory = ({ data }) => {
  // Render the line chart using Google Charts and provided data
  const lineChartData = [
    ['Airline', 'Departure Delay', 'Arrival Delay'],
    ...data.map(({ AIRLINE, DEPARTURE_DELAY, ARRIVAL_DELAY }) => [
      AIRLINE,
      DEPARTURE_DELAY,
      ARRIVAL_DELAY,
    ]),
  ];

  return (
    <Chart
      chartType='LineChart'
      width='100%'
      height='400px'
      data={lineChartData}
      options={lineChartOptions}
    />
  );
};

export default AirlinesHistory;
