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
      <main className="design-main">
        
        {/* CENTER AREA */}
        <div className="center-area">
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

              <div className="bottom-controls">
                <button>↶</button>
                <button>↻</button>
                <button>🔍</button>
                <button>🔎</button>
                <button>⟳</button>
                <button>🎨</button>
              </div>

            </>
          )}
        </div>

        {/* CHAT SIDEBAR (Always visible) */}
        <aside className="chat-sidebar">
          <div className="chat-header">
            <div>
              <h4>Design Assistant</h4>
              <span>AI-powered guidance</span>
            </div>
            <div className="chat-header-icons">
              <button>⟳</button>
              <button>⚙️</button>
            </div>
          </div>

          <div className="chat-body">
            <div className="assistant-message">
              <div className="assistant-name">EcoFit Assistant</div>
              <div className="message-text">
                Welcome to Personalize Mode! Upload inspiration images or describe your vision, and I'll generate custom sustainable designs for you.
              </div>
              <div className="timestamp">02:33 AM</div>
            </div>
          </div>

          <div className="chat-input-area">
            <textarea
              placeholder="Ask about your personalized design..."
              rows={1}
              className="chat-textarea"
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';  // Reset the height
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set it to the scroll height
              }}
            />
            <button className="send-btn">➤</button>
          </div>

          <div className="chat-hint">
            Try: "Generate a sustainable dress inspired by forest patterns"
          </div>
        </aside>

      </main>

      {/* Footer */}
      <footer className="footer-tag">
        🌿 Sustainable choices. Stunning creations.
      </footer>
    </div>

  );
}
