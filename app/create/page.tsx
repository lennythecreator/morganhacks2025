'use client';

import { useState, useRef } from 'react';
import './create.css'; // Your custom styles
import axios from 'axios';
import ModelViewer from '../ModelViewer';
import { useGLTF } from '@react-three/drei';
export default function Create() {
  const [activeMode, setActiveMode] = useState('creative');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff'); // Default color white
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mannequin, setMannequin] = useState('true')

  const earth = useGLTF("/tripo_pbr_model_e2aa4f5c-ffdf-4821-938b-c495e2721c0c.glb");

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

 


  function fakeAssistantReply(userInput: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Thanks for your message: "${userInput}"! 🌿 Here's a sustainable idea.`);
      }, 1500); // simulate thinking for 1.5 seconds
    });
  }

  
  async function handleSend() {
    if (!input.trim()) return; // No empty messages
  
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    try {
       // Make Axios POST request to backend
      const response = await axios.post('http://127.0.0.1:5000/generate_model', {
        prompt: input
      });

      // Assuming your backend returns { reply: '...' }
      const aiReply = response.data.message;
      const mannequin_url = response.data.model_url
  
      const assistantMessage = { role: 'assistant', content: aiReply };
      setMessages(prev => [...prev, assistantMessage]);
      setMannequin(response.data.mannequin_url)
    } catch (error) {
      console.error('Error generating assistant reply:', error);
      // Show error message if request fails
      const assistantMessage = { role: 'assistant', content: "Oops! Failed to generate a reply." };
      setMessages(prev => [...prev, assistantMessage]);
    }
  
    setLoading(false);
  }
  return (
    <div className="design-page">
      {/* Navbar */}
      <nav className="design-navbar">
          <div className="design-navbar-left">
            <div className="design-logo">EcoFit 3D</div>
            <div className="design-modes">
              <button
                className={`mode-btn ${activeMode === 'creative' ? 'active' : ''}`}
                onClick={() => setActiveMode('creative')}
              >
                ✨ Creative Mode
              </button>
              <button
                className={`mode-btn ${activeMode === 'personalize' ? 'active' : ''}`}
                onClick={() => setActiveMode('personalize')}
              >
                🖼️ Personalize
              </button>
            </div>
          </div>

          <div className="design-navbar-right">
            <button className="secondary-btn">Save</button>
            <button className="secondary-btn">Share</button>
            <button className="primary-btn">Export</button>
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

            <div className="mannequin">
              {
                mannequin? <ModelViewer  model = {earth} />:null
              }

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
          {/* Chat Header */}
          <div className="chat-header">
            <h4>Design Assistant</h4>
            <p className="chat-subtitle">AI-powered guidance</p>
          </div>

          {/* Chat Messages Scrollable Area */}
          <div className="chat-messages">
            {messages.map((m, index) => (
              <div key={index} className="chat-bubble">
                <strong>{m.role === 'user' ? 'You' : 'EcoFit Assistant'}</strong><br />
                {m.content}
                <div className="timestamp">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble">
                <strong>EcoFit Assistant</strong><br />
                Typing...
                <div className="timestamp">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Area */}
          <div className="chat-input">
            <textarea
              placeholder="Ask about your personalized design..."
              rows={1}
              className="chat-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';  
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; 
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="send-btn" onClick={handleSend}>➤</button>
          </div>

          {/* Hint Text */}
          <p className="hint-text">
            Try: "Generate a sustainable dress inspired by forest patterns"
          </p>
        </aside>

          </main>

      {/* Footer */}
      <footer className="footer-tag">
        🌿 Sustainable choices. Stunning creations.
      </footer>
    </div>
  );
}