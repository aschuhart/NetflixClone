import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const handleStateSwitch = () => {
    setSignState(prevState => (prevState === "Sign In" ? "Sign Up" : "Sign In"));
  };

  return (
    <div className='Login'>
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {/* Conditionally render input field for "Your name" */}
          {signState === "Sign Up" && <input type="text" placeholder='Your name' />}
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button type="button">{signState === "Sign In" ? "Sign In" : "Sign Up"}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={handleStateSwitch}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={handleStateSwitch}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};


export default Login;
