import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Importação essencial para navegar

export default function GameCard({ game, variant = "vertical" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  // Função para renderizar as estrelas
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? "#a78bfa" : "#334155"} size={14} />
    ));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Classe de animação para suavidade
  const animationClass = isVisible ? 'visible' : 'hidden';

  // --- VARIANTE HORIZONTAL (Página de Produtos) ---
  if (variant === "horizontal") {
    return (
      <section className={`game-item-horizontal news-hover ${animationClass}`} ref={domRef}>
        <div className="game-image-container">
          <img src={game.image} alt={game.title} />
        </div>
        
        <div className="game-info-container">
          <div className="game-header-row">
            <h3>{game.title}</h3>
            <span className="game-price">R$ {game.price.toFixed(2)}</span>
          </div>
          <p className="game-description">{game.description}</p>
          
          <div className="game-meta-info">
            <p><strong>Lançamento:</strong> {game.releaseDate}</p>
            <div className="game-rating">
              <strong>Avaliação:</strong>
              <div className="stars-row">{renderStars(game.rating)}</div>
            </div>
          </div>

          {/* Botão transformado em Link para a página de detalhes */}
          <Link to={`/product/${game.id}`} className="details-btn-horizontal" style={{ textDecoration: 'none', textAlign: 'center' }}>
            Ver Detalhes
          </Link>
        </div>
      </section>
    );
  }

  // --- VARIANTE VERTICAL (Home / Outros) ---
  return (
    <div className={`card ${animationClass}`} ref={domRef}>
      <img src={game.image} alt={game.title} />
      <div className="card-content">
        <h3>{game.title}</h3>
        <p className="card-price">R$ {game.price.toFixed(2)}</p>
        
        {/* Link para a página de detalhes */}
        <Link to={`/product/${game.id}`} className="view-details-link">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}