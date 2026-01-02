import React from 'react';

const Footer = () => (
  <div style={{
    marginLeft: '190px',
    padding: '16px 24px',
    borderTop: '0.5px solid #e8e6e0',
    fontSize: '12px',
    color: '#5c5c5c',
    fontFamily: 'DM Sans, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
  }}>
    <span>AeroGraph - US Flight Data Dashboard</span>
    <span>Data source: US DOT 2015 Airline On-Time Statistics</span>
  </div>
);

export default Footer;