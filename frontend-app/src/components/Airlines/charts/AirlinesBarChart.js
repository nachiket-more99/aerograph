import React from 'react';
import { Chart } from 'react-google-charts';

// Define options for the chart
export const barChartOptions = {
  width: 'auto',
  height: '100%',
  chartArea: { width: '70%', height: '70%' },
  colors: ['#a78bfa', '#e9d5ff'],
  fontName: 'DM Sans',
  legend: { position: 'none' },
  isStacked: true,
  hAxis: {
    title: 'Delay (mins)',
    titleTextStyle: { color: '#bbb', fontSize: 11, italic: false },
    textStyle: { color: '#bbb', fontSize: 10 },
    minValue: 0,
    gridlines: { color: '#f0eeea' },
    baselineColor: '#e8e6e0',
  },
  vAxis: {
    textStyle: { color: '#999', fontSize: 11 },
  },
  backgroundColor: 'transparent',
};

// Functional component for Airlines Bar Chart
const AirlinesBarChart = ({ data }) => {
  // Render the chart using Google Charts and provided data
  return (
    <Chart
      chartType='BarChart'
      data={[
        ['Airline', 'DEP delay', 'ARR delay'],
        ...data.map(({ AIRLINE, DEPARTURE_DELAY, ARRIVAL_DELAY }) => [
          AIRLINE,
          DEPARTURE_DELAY,
          ARRIVAL_DELAY,
        ]),
      ]}
      options={barChartOptions}
    />
  );
};

export default AirlinesBarChart;
