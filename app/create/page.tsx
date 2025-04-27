'use client';

import { useState, useRef } from 'react';
import './create.css'; // Your custom styles

export default function Create() {
  const [activeMode, setActiveMode] = useState('creative');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff'); // Default color white

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('File input reference is not available');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handlePaintButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="design-page">
      {/* Navbar */}
      <nav className="design-navbar">
        <div className="design-navbar-left">
          <div className="design-logo">EcoFit 3D</div>
          <div className="design-modes">
            <button
              className={activeMode === 'creative' ? 'mode-btn active' : 'mode-btn'}
              onClick={() => setActiveMode('creative')}
            >
              ✨ Creative Mode
            </button>
            <button
              className={activeMode === 'personalize' ? 'mode-btn active' : 'mode-btn'}
              onClick={() => setActiveMode('personalize')}
            >
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

      {/* Eco Badge */}
      <div className="eco-badge">🌿 Eco-friendly materials</div>

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

            <div className="mannequin">Mannequin / 3D Model Placeholder</div>

            <div className="bottom-controls">
              <button>↶</button>
              <button>↻</button>
              <button>🔍</button>
              <button>🔎</button>
              <button>⟳</button>
              {/* Paint button */}
              <button onClick={handlePaintButtonClick}>🎨</button>

              {/* Hidden Color Picker */}
              <input
                type="color"
                ref={colorInputRef}
                value={selectedColor}
                onChange={handleColorChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className="right-arrow">➔</div>
          </>
        )}

        {/* Personalize Mode */}
        {activeMode === 'personalize' && (
          <>
            <div className="upload-box">
              <div className="upload-icon">⬆️</div>
              <h3>Upload Inspiration</h3>

              <div className="p-4">
                <p>Upload your own picture:</p>

                {/* File input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />

                {/* Browse Files Button */}
                <button onClick={handleButtonClick} className="browse-btn">
                  Browse Files
                </button>

                {/* Preview selected image with color overlay */}
                {selectedImage && (
                  <div
                    className="preview-container"
                    style={{
                      position: 'relative',
                      width: '300px',
                      height: '300px',
                      marginTop: '20px',
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="preview-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    {/* Color overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: selectedColor,
                        opacity: 0.4,
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

           

            <div className="bottom-controls">
              <button>↶</button>
              <button>↻</button>
              <button>🔍</button>
              <button>🔎</button>
              <button>⟳</button>
              {/* Paint button */}
              <button onClick={handlePaintButtonClick}>🎨</button>

              {/* Hidden Color Picker */}
              <input
                type="color"
                ref={colorInputRef}
                value={selectedColor}
                onChange={handleColorChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className="right-arrow">➔</div>
          </>
        )}

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

                      <p className="hint-text">Try: "Generate a sustainable dress inspired by forest patterns"</p>
                    </aside>
              </main>

      {/* Footer */}
      <footer className="footer-tag">
        🌿 Sustainable choices. Stunning creations.
      </footer>
    </div>
  );
}
