import React from 'react';
import { Chart } from 'react-google-charts';

export const pieChartOptions = {
  width: '100%',
  height: '100%',
  chartArea: { width: '80%', height: '80%' },
  backgroundColor: 'transparent',
  fontName: 'DM Sans',
  slices: [
    { color: '#a78bfa' },
    { color: '#67e8f9' },
    { color: '#86efac' },
    { color: '#fda4af' },
    { color: '#fbbf24' },
    { color: '#60a5fa' },
    { color: '#f472b6' },
    { color: '#34d399' },
    { color: '#fb923c' },
    { color: '#a3e635' },
    { color: '#e879f9' },
    { color: '#38bdf8' },
    { color: '#f87171' },
    { color: '#94a3b8' },
  ],
  pieSliceText: 'none',
  legend: { position: 'bottom', textStyle: { color: '#888', fontSize: 11 } },
  pieHole: 0.6,
  pieSliceBorderColor: 'transparent',
};

const AirlinesPieChart = ({ data }) => {
  const pieChartData = [
    ['Airline', 'Count'],
    ...data.map(({ Name, count }) => [Name, count]),
  ];

  return (
    <Chart chartType='PieChart' data={pieChartData} options={pieChartOptions} />
  );
};

export default AirlinesPieChart;
