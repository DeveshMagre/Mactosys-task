import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    } 
  }, []);

  if (user === null) {
    return <div>Loading............</div>;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#343a40',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden' 
    }}>

      <div>
        <p>UserName: {user.username}</p>
        <p>Full Name: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
