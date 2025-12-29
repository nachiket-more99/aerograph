import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/airlines', label: 'Airlines' },
    { to: '/airports', label: 'Airports' },
    { to: '/flights', label: 'Flights' },
  ];

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
      </div>
    </>
  );
};

export default Navbar;