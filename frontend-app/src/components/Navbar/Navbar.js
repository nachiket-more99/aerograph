import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const links = [
    { to: '/airlines', label: 'Airlines' },
    { to: '/airports', label: 'Airports' },
    { to: '/flights', label: 'Flights' },
  ];

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
        <span className='topbar-title'>Dashboard</span>
      </div>
    </>
  );
};

export default Navbar;