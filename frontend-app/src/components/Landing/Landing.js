import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='landing'>
      <div className='landing-nav'>
        <span className='landing-logo'>Aero<span>Graph</span></span>
      </div>

      <div className='landing-hero'>
        <div className='landing-badge'>✈ US Flight Data 2015</div>
        <h1 className='landing-title'>
          Visualize US<br />Flight Networks
        </h1>
        <p className='landing-subtitle'>
          Explore 10,000+ flights across 300+ airports and 13 airlines.<br />
          Interactive maps, delay analytics, and route distribution.
        </p>
        <button className='landing-cta' onClick={() => navigate('/airlines')}>
          Open Dashboard →
        </button>
      </div>

      <div className='landing-stats'>
        <div className='landing-stat'>
          <span className='stat-num'>10k+</span>
          <span className='stat-label'>Flights</span>
        </div>
        <div className='landing-stat'>
          <span className='stat-num'>300+</span>
          <span className='stat-label'>Airports</span>
        </div>
        <div className='landing-stat'>
          <span className='stat-num'>13</span>
          <span className='stat-label'>Airlines</span>
        </div>
        <div className='landing-stat'>
          <span className='stat-num'>48</span>
          <span className='stat-label'>States</span>
        </div>
      </div>

      <div className='landing-footer'>
        Data source: US DOT 2015 Airline On-Time Statistics
      </div>
    </div>
  );
};

export default Landing;