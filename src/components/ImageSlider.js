import React, { useState } from 'react';
import './ImageSlider.css';

const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkGAwwEexDeCiqpCYJFtCSvttEpi1mF_2ANA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jW8FSKZuSWiKLQaZ16menrdQZ3txfrzWrQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlqSirEdtJeSAO7Dn-6PZVQ63UdldjEN5LUg&s'

    
];


const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <div className="slider-content" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
        <div className="overlay-text">
          <h1>Empowering Justice with AI-driven Insights</h1>
          <p>Streamline legal processes with advanced case prioritization, timeline prediction, and document management.</p>
        </div>
        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default ImageSlider;
