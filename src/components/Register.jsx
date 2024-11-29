import React, { useState } from 'react';
import { registerUser, verifyEmail } from '../services/api';  
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    zip_code: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Track if the email is verified
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.username || !formData.email || 
        !formData.phone || !formData.zip_code || !formData.password || !formData.confirm_password) {
      setError('All fields are required.');
      return false;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await registerUser({ ...formData, device_type: 'website' });
      console.log(response);

      if (response && response.statuscode === true) {
        setSuccessMessage('Registration successful! Please check your email to verify your account.');
      } else {
        setError('Registration failed! Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyEmail(verificationCode);
      
      if (response && response.status === 'verified') {
        setIsVerified(true);
        setSuccessMessage('Email verified successfully!');
      } else {
        setError('Verification failed! Please check the code and try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('An error occurred during verification.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5%',
    }}>
      <h2>Register</h2>

      {/* Display registration form if email is not verified */}
      {!isVerified ? (
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          margin: '0 auto',
          gap: '20px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
          backgroundColor: 'white'
        }}>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            style={{ height: '25px' }}
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            style={{ height: '25px' }}
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            style={{ height: '25px' }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ height: '25px' }}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            style={{ height: '25px' }}
          />
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            placeholder="Zip Code"
            style={{ height: '25px' }}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{ height: '25px' }}
          />
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            style={{ height: '25px' }}
          />
          <button type="submit" style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Register</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
      
        <form onSubmit={handleVerificationSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          margin: '0 auto',
          gap: '20px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
          backgroundColor: 'white'
        }}>
          <h3>Email Verification</h3>
          <input
            type="text"
            name="verification_code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            placeholder="Enter Verification Code"
            style={{ height: '25px' }}
          />
          <button type="submit" style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Verify Email</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
