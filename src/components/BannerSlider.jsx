import React, { useState, useEffect } from 'react';

const banners = [
  { id: 1, image: "/assets/banner-game.png", title: "Lançamentos da Semana" },
  { id: 2, image: "/assets/f125.png", title: "F1 25: Sinta a Velocidade" },
  { id: 3, image: "/assets/finalfantasy-vii-remake.png", title: "Novas DLCs Disponíveis" }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container">
      {banners.map((banner, index) => (
        <div 
          key={banner.id} 
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(to top, #0f172a, transparent), url(${banner.image})` }}
        >
          <div className="slide-content">
            <h2>{banner.title}</h2>
            <button className="banner-btn">Confira agora</button>
          </div>
        </div>
      ))}
      <div className="slider-dots">
        {banners.map((_, i) => (
          <span key={i} className={`dot ${i === current ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}