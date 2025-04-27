'use client';

import React, { useState, FormEvent } from 'react';
import './login.css'; 

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="leaf-icon">
      <path d="M17 8C17 10.41 15.41 14.26 12 15.93 8.59 14.26 7 10.41 7 8C7 5.24 9.24 3 12 3S17 5.24 17 8M12 21.5C15.87 21.5 19.5 18.87 19.5 15V12H17V15C17 17.76 14.76 20 12 20S7 17.76 7 15V12H4.5V15C4.5 18.87 8.13 21.5 12 21.5Z" />
    </svg>
  );

const EyeIcon = ({ ...props }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);
const EyeOffIcon = ({ ...props }) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);
// --- End Reusable Icons ---

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        alert('Login successful! 🎉');
        // You can redirect to dashboard or homepage here
        window.location.href = '/dashboard'; // example
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };
  

  return (
    // Use class names intended for styling via login.css
    <div className="login-page-container">
      <header className="login-header">
        <div className="logo">
          <LeafIcon /> EcoFit 3D
        </div>
      </header>

      <main className="login-main">
        <div className="login-form-container">
          <div className="form-logo">
            <LeafIcon />
          </div>
          <h1>Welcome back to EcoFit 3D</h1>
          <p className="subtitle">Continue your sustainable design journey</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                suppressHydrationWarning 
                required
              />
            </div>

            <div className="form-group password-group">
              <div className="password-label-group">
                 <label htmlFor="password">Password</label>
                 <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon /> }
              </button>
            </div>

            <button type="submit" className="submit-button">
              Enter Your Studio
            </button>
          </form>

          <p className="signup-link">
            Don&apos;t have an account? <a href="/signup">Create Account</a>
          </p>

          <p className="footer-text">
            &ldquo;Every design you create helps shape a greener future.&rdquo;
          </p>
        </div>
      </main>

      <footer className="page-footer">
          <p>&copy; 2024 EcoFit 3D. All rights reserved.</p>
      </footer>
    </div>
  );
}