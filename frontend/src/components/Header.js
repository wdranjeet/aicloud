import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ onLogout }) {
  const location = useLocation();

  return (
    <div className="header">
      <div className="container">
        <h1>⚡ AICloud</h1>
        <div className="nav">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </Link>
          <button onClick={onLogout} className="btn btn-secondary" style={{ marginLeft: 'auto' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
