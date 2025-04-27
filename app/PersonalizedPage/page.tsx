'use client';

import React, { useState } from 'react';
import './PersonalizedPage.css'; 

export default function PersonalizedPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <>
      <p>Upload your own picture:</p>

      <div className="image-prev">
        <input
          type="file"
          accept="image/*"
          className="upload-button"
          onChange={handleImageChange}
        />

        {/* Show image preview if an image is selected */}
        {selectedImage && (
          <div className="preview-container">
            <img src={selectedImage} alt="Selected Preview" className="preview-image" />
          </div>
        )}
      </div>
    </>
  );
}
