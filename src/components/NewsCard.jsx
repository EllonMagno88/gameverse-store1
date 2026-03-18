import React, { useEffect, useRef, useState } from 'react';
import { FaRegClock, FaFire } from "react-icons/fa";
// 1. Importar o hook de conquistas
import { useAchievements } from '../context/AchievementContext';

export default function NewsCard({ item, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 
  const domRef = useRef();
  
  // 2. Extrair a função de rastreio
  const { trackNewsClick } = useAchievements();

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      clearTimeout(timer);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const animatedStyle = {
    opacity: isVisible && isMounted ? 1 : 0,
    transform: isVisible && isMounted ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    transitionDelay: isVisible ? `${(index % 10) * 100}ms` : '0ms'
  };

  return (
    <a 
      href={item.externalLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="news-card-anchor"
      ref={domRef}
      // 3. Adicionar o gatilho de clique aqui
      onClick={trackNewsClick}
    >
      <section 
        className={`game-item-horizontal news-hover ${isVisible ? 'visible' : ''}`}
        style={animatedStyle}
      >
        <div className="game-image-container">
          <img 
            src={item.image} 
            alt={item.title} 
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225/1e1b4b/a78bfa?text=Game+News'; }} 
          />
        </div>
        
        <div className="game-info-container">
          <div className="game-header-row">
            <span className="news-source">
              <FaFire style={{ marginRight: '5px', color: '#ff4500' }} /> 
              {item.source}
            </span>
            <span className="news-date">
              <FaRegClock style={{ marginRight: '5px' }} /> 
              {item.date}
            </span>
          </div>
          <h3 className="news-title">{item.title}</h3>
          <p className="game-description">
            {item.description?.length > 150 ? `${item.description.substring(0, 150)}...` : item.description}
          </p>
          <span className="read-more-text">Ler notícia completa →</span>
        </div>
      </section>
    </a>
  );
}