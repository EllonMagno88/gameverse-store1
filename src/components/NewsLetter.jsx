import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelopeOpenText } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Feedback visual para o usuário
      toast.success("Hype confirmado! Você agora faz parte do nosso loot de notícias.", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "dark",
      });
      setEmail("");
    }
  };

  return (
    <section className="newsletter-container">
      <div className="newsletter-glass-card">
        <div className="newsletter-info">
          <div className="icon-box">
            <FaEnvelopeOpenText className="floating-icon" />
          </div>
          <div className="text-content">
            <h3>Junte-se à Guilda!</h3>
            <p>Receba atualizações do multiverso, promoções exclusivas e as notícias mais quentes diretamente no seu radar.</p>
          </div>
        </div>

        <form className="newsletter-input-group" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Digite seu melhor e-mail..." 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="subscribe-btn">
            Inscrever-se <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
}