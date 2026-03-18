import React from 'react';
import { FaGithub, FaLinkedin, FaDiscord, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-logo">Game<span>Verse</span></h2>
          <p>Seu portal definitivo para o multiverso dos games.</p>
        </div>

        <div className="footer-section">
          <h4>Explorar</h4>
          <ul>
            <li>Home</li>
            <li>Produtos</li>
            <li>Notícias</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <FaGithub />
            <FaLinkedin />
            <FaDiscord />
          </div>
        </div>

        {/* A PRIMEIRA PISTA DO ENIGMA */}
        <div className="footer-section footer-clue">
          <p className="clue-text">
            "Para subir na vida, olhe duas vezes para o céu; para descer ao núcleo, olhe duas vezes para a terra."
          </p>
          <div className="clue-icons">
            <FaChevronUp className="clue-arrow" />
            <FaChevronUp className="clue-arrow" />
            <FaChevronDown className="clue-arrow" />
            <FaChevronDown className="clue-arrow" />
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 GameVerse Store - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}