import React from "react";
import { Chart } from "react-google-charts";

// Sample data for the pie chart
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

// Options for the pie chart
export const pieChartOptions = {
  width: 'auto',
  height: '100%',
  fontName: 'DM Sans',
  backgroundColor: 'transparent',
  legend: { position: 'none' },
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
  pieSliceBorderColor: 'transparent',
  chartArea: { width: '85%', height: '85%' },
};

/**
 * Function for rendering a PieChart using react-google-charts.
 * @param {Array} trafficData - Data to be displayed in the pie chart.
 */
const AirportsBarChart = ({ trafficData }) => {
  return (
    <Chart
      chartType="PieChart"
      data={trafficData}
      options={pieChartOptions}
      width={"100%"}
      height={"100%"}
    />
  );
};

export default AirportsBarChart;
