// src/app/page.tsx
'use client'; // Add this directive if using Next.js App Router

import React, { useState, FormEvent } from 'react';
import './signup.scss'; // Import the CSS file

// Basic SVG Leaf Icon (replace with your actual logo SVG or image)
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="leaf-icon">
    <path d="M17 8C17 10.41 15.41 14.26 12 15.93 8.59 14.26 7 10.41 7 8C7 5.24 9.24 3 12 3S17 5.24 17 8M12 21.5C15.87 21.5 19.5 18.87 19.5 15V12H17V15C17 17.76 14.76 20 12 20S7 17.76 7 15V12H4.5V15C4.5 18.87 8.13 21.5 12 21.5Z" />
  </svg>
);

// Basic Eye Icon (replace with your actual icon)
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


export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      fullName,
      email,
      password,
      agreedToTerms,
    });
    alert('Account creation simulated. Check console for details.');
  };

  return (
    <div className="signup-page-container">
      <header className="signup-header">
        <div className="logo">
          <LeafIcon /> EcoFit 3D
        </div>
        <a href="/login" className="back-link"> {/* Adjust href as needed */}
          &larr; Back to login
        </a>
      </header>

      <main className="signup-main">
        <div className="signup-form-container">
          <div className="form-logo">
            <LeafIcon />
          </div>
          <h1>Join EcoFit 3D</h1>
          <p className="subtitle">Start your sustainable design journey today</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon /> }
              </button>
              <p className="input-hint">Must be at least 8 characters</p>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="submit-button">
              Create Your Account
            </button>
          </form>

          <p className="signin-link">
            Already have an account? <a href="/login">Sign in</a> {/* Adjust href as needed */}
          </p>

          <p className="footer-text">
            &ldquo;Every design you create helps shape a greener future.&rdquo;
          </p>
        </div>
      </main>
    </div>
  );
}