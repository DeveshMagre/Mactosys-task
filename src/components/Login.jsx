import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log(response.data);
      if (response && response.statuscode === true) {
        localStorage.setItem('user', JSON.stringify(response.data?.[0]));
        navigate('/dashboard');
      } else {
        setError('Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div style={{
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems:'center',
     marginTop:'10%',
     
    }}>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '0 auto',
        gap:' 20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        backgroundColor: 'white'
      }}>
        
        <h2>Login</h2>
        <input
         style={{
           height:'25px'
         }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          style={{
            height:'25px'
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer'
        }} type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
