export const registerUser = async (userData) => {
    try {
      const response = await fetch('http://134.209.229.112:8080/api/users/register_web', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  export const verifyEmail = async (verificationCode) => {
    try {
      const response = await fetch('http://134.209.229.112:8080/api/users/verify_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      });
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  };
  

  export const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch('http://134.209.229.112:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  export const getProfile = async (userId, token) => {
    try {
      const response = await fetch(`http://134.209.229.112:8080/api/users/profile?id=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };
  