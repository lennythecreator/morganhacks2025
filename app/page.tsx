'use client';  
import Image from "next/image"; 

import './create/home.css'; // Import your CSS file here
import { useState} from "react";
import { useRouter } from 'next/navigation';
import ModelViewer from './ModelViewer';
export default function Home() {
  const [activeTab, setActiveTab] = useState("creative");
    const router = useRouter();
  
    const handleNavigate = (e) => {
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
              <div className="interactive-preview">
                <ModelViewer />
              </div>
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

        {/* WHY ECOFIT 3D SECTION */}
        <section className="why-ecofit-section" id="why-ecofit">
          <h2 className="section-title">Why EcoFit 3D</h2>
          <p className="section-description">
            Our platform is built with sustainability and creativity at its core
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>Sustainability First</h3>
              <p>Every design decision is guided by environmental impact, promoting eco-friendly materials and production methods.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Empower Creativity</h3>
              <p>Our tools remove technical barriers, allowing your creative vision to flow freely without limitations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧑‍🤝‍🧑</div>
              <h3>Accessible to Everyone</h3>
              <p>Whether you're a professional designer or just starting out, our platform is intuitive and easy to use.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Designed for Future Makers</h3>
              <p>Join a community of forward-thinking designers shaping the future of sustainable fashion.</p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="cta-section">
          <h2>Shape your vision. Save the planet.</h2>
          <p>Join thousands of designers creating sustainable fashion with our innovative 3D platform.</p>
          <button className="cta-button">Create Your First Design →</button>

          <div className="cta-stats">
            <div className="stat-item">
              ♻️
              <p>100% Sustainable</p>
            </div>
            <div className="stat-item">
              👥
              <p>10,000+ Designers</p>
            </div>
            <div className="stat-item">
              ✨
              <p>Unlimited Creativity</p>
            </div>
          </div>
        </section>

        {/* FOOTER SECTION */}
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>EcoFit 3D</h3>
              <p>Sustainable fashion design for a better future.</p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Product</h4>
                <ul>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Case Studies</li>
                  <li>Resources</li>
                  <li>Updates</li>
                </ul>
              </div>
              <div>
                <h4>Company</h4>
                <ul>
                  <li>About</li>
                  <li>Team</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4>Legal</h4>
                <ul>
                  <li>Terms</li>
                  <li>Privacy</li>
                  <li>Cookies</li>
                  <li>Licenses</li>
                  <li>Settings</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 EcoFit 3D. All rights reserved.</p>
            <div className="footer-legal">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies</span>
            </div>
          </div>
        </footer>
  
      </div>
    );
}
