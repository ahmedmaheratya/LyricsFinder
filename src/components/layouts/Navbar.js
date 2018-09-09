import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
      <nav>
        <Link to="/" className="logo">LyricsFinder.</Link>
        <div className="desktopNav">
            <NavLink to="/" activeClassName="active"><i className="fas fa-home"></i> HOME</NavLink>
        </div>
  </nav>
  )
}

export default Navbar