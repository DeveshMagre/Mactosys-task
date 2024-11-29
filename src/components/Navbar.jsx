import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: 'lightgray',
      borderRadius: '5px',
    }}>
      <Link style={{
        margin: '0 10px',
        padding: '10px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'green',
        borderRadius: '5px',

      }} to="/login">Login</Link> | <Link style={{
        margin: '0 10px',
        padding: '10px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'red',
        borderRadius: '5px',

      }} to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
