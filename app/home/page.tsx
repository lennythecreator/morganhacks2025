'use client';

import "./home.css";
import { useState} from "react";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("creative");
  const router = useRouter();

  const handleNavigate = (e:any) => {
    e.preventDefault()
    router.push('/login');
  };

  return (
    <div className="homepage">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Logo */}
          <div className="navbar-logo">
            EcoFit <span>3D</span>
          </div>

          {/* Navigation Links */}
          <ul className="navbar-links">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#why-ecofit">Why EcoFit 3D</a></li>
          </ul>

          {/* Buttons */}
          <div className="navbar-buttons">
            <button className="login-btn" onClick={handleNavigate}>Log in</button>
            <button className="signup-btn" onClick={( )=> {router.push('/signup');}}>Sign up</button>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">Sustainable Fashion Design</span>
            <h1 className="hero-title">Design the Future <br /> <span>of Fashion.</span></h1>
            <p className="hero-description">
              Create sustainable, original fashion with 3D design or personalized AI inspiration. 
              Reimagine what's possible with eco-conscious creativity.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Start Designing</button>
              <button className="secondary-btn">View Demo</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="interactive-preview">Interactive 3D Preview</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-description">
          Choose between two powerful design experiences to bring your sustainable fashion ideas to life.
        </p>

        <div className="tabs">
          <button
            className={activeTab === "creative" ? "tab active" : "tab"}
            onClick={() => setActiveTab("creative")}
          >
            ✨ Creative Mode
          </button>
          <button
            className={activeTab === "personalized" ? "tab active" : "tab"}
            onClick={() => setActiveTab("personalized")}
          >
            🖼️ Personalize Mode
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "creative" ? (
            <div className="tab-panel">
              <div className="image-placeholder">3D Model Placeholder</div>
              <div className="tab-text">
                <h3>3D Design Generator</h3>
                <ul>
                  <li>Intuitive 3D modeling tools designed specifically for fashion</li>
                  <li>Real-time fabric simulation with eco-friendly materials</li>
                  <li>Precise control over every aspect of your design</li>
                  <li>Export your creations for manufacturing or sharing</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="tab-panel">
              <div className="image-placeholder">Personalized Image Placeholder</div>
              <div className="tab-text">
                <h3>Personalized Inspiration</h3>
                <ul>
                  <li>Upload reference images for customized designs</li>
                  <li>AI assistance for tailored sustainable fashion ideas</li>
                  <li>Quick previews based on your style and needs</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2 className="section-title">Inspiration Gallery</h2>
        <p className="section-description">Explore stunning eco-friendly designs created with EcoFit 3D</p>

        <div className="gallery-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="gallery-card">
              <div className="gallery-badge">
                {index % 2 === 0 ? "AI Generated" : "3D Model"}
              </div>
              <div className="gallery-placeholder">Image</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

