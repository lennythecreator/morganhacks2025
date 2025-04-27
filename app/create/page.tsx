'use client';

import { useState } from 'react';
import './create.css';

export default function create() {
  const [activeMode, setActiveMode] = useState('creative');

  return (
    <div className="design-page">
      
      {/* Navbar */}
      <nav className="design-navbar">
        <div className="design-navbar-left">
          <div className="design-logo">EcoFit 3D</div>
          <div className="design-modes">
            <button className={activeMode === 'creative' ? 'mode-btn active' : 'mode-btn'} onClick={() => setActiveMode('creative')}>
              ✨ Creative Mode
            </button>
            <button className={activeMode === 'personalize' ? 'mode-btn active' : 'mode-btn'} onClick={() => setActiveMode('personalize')}>
              🖼️ Personalize
            </button>
          </div>
        </div>
        <div className="design-navbar-right">
          <button className="navbar-btn">Save</button>
          <button className="navbar-btn">Share</button>
          <button className="export-btn">Export</button>
        </div>
      </nav>

      {/* Eco badge */}
      <div className="eco-badge">
        🌿 Eco-friendly materials
      </div>

      {/* Main Content */}
      <main className={activeMode === 'personalize' ? 'design-main personalize' : 'design-main'}>
        
        {/* Creative Mode */}
        {activeMode === 'creative' && (
          <>
            <div className="left-tools">
              <button className="tool-btn">👕</button>
              <button className="tool-btn">✏️</button>
              <button className="tool-btn">👖</button>
            </div>

            <div className="mannequin">
              Mannequin / 3D Model Placeholder
            </div>

            <div className="bottom-controls">
              <button>↶</button>
              <button>↻</button>
              <button>🔍</button>
              <button>🔎</button>
              <button>⟳</button>
              <button>🎨</button>
            </div>

            <div className="right-arrow">
              ➔
            </div>
          </>
        )}

        {/* Personalize Mode */}
        {activeMode === 'personalize' && (
          <>
            <div className="upload-box">
              <div className="upload-icon">⬆️</div>
              <h3>Upload Inspiration</h3>
              <p>Drag and drop your inspiration images, sketches, or mood boards</p>
              <button className="browse-btn">Browse Files</button>
              <small>Upload designs, colors, or styles you love!</small>
            </div>

            <aside className="chat-assistant">
              <div className="chat-header">
                <h4>Design Assistant</h4>
                <p className="chat-subtitle">AI-powered guidance</p>
              </div>
              <div className="chat-messages">
                <div className="chat-bubble">
                  <strong>EcoFit Assistant</strong><br />
                  Welcome to Personalize Mode! Upload inspiration images or describe your vision, and I'll generate custom sustainable designs for you.
                  <div className="timestamp">02:33 AM</div>
                </div>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Ask about your personalized design..." />
                <button className="send-btn">➤</button>
              </div>
              <p className="hint-text">Try: "Generate a sustainable dress inspired by forest patterns"</p>
            </aside>

            <div className="bottom-controls">
              <button>↶</button>
              <button>↻</button>
              <button>🔍</button>
              <button>🔎</button>
              <button>⟳</button>
              <button>🎨</button>
            </div>

            <div className="right-arrow">
              ➔
            </div>
          </>
        )}

      </main>

      {/* Footer Tag */}
      <footer className="footer-tag">
        🌿 Sustainable choices. Stunning creations.
      </footer>
    </div>
  );
}
