import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const Navbar = () => {
  const location = useLocation();
  const { airlinesData, flightsData, airportsData } = useContext(DataContext);

  const links = [
    { to: '/airlines', label: 'Airlines' },
    { to: '/airports', label: 'Airports' },
    { to: '/flights', label: 'Flights' },
  ];

  const badges = [
    { label: 'Airlines', value: airlinesData?.length },
    { label: 'Flights', value: flightsData?.length?.toLocaleString() },
    { label: 'Airports', value: airportsData?.length },
  ]

  const pageTitle = links.find(link => location.pathname.includes(link.to.replace('/', '')))?.label || 'Dashboard';

  return (
    <>
      <div className='sidebar'>
        <div className='logo'>Aero<span>Graph</span></div>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'nav-link-item active' : 'nav-link-item'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className='topbar'>
        <span className='topbar-title'>{pageTitle}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          {badges.map((badge, i) => (
            <div key={i} style={{
              background: '#f0eefb',
              border: '0.5px solid #ddd9f7',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '12px',
              color: '#7c5cbf',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}>
              <span style={{ color: '#7c5cbf' }}>{badge.label}</span>
              <span style={{ fontWeight: 500 }}>{badge.value ?? '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;