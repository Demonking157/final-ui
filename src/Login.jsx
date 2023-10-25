import React, { useState } from 'react';
import "./login.css";
import { useNavigation } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();

  const handleClick = () => {
    // Perform login logic here
    // For this example, we'll simply redirect to the home page
    navigate('/home');
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default Login;


