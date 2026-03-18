import React, { useState } from 'react';
import './RetroFooter.css';

export default function RetroFooter() {
  const [isOff, setIsOff] = useState(false);

  const handlePowerOff = () => {
    setIsOff(true);
    // Simula o sistema religando após 4 segundos
    setTimeout(() => setIsOff(false), 4000);
  };

  return (
    <>
      {/* Camada que executa a animação de desligamento */}
      <div className={`crt-power-off ${isOff ? 'active' : ''}`}></div>

      <footer className="retro-footer">
        <div className="retro-footer-divider"></div>
        
        <div className="retro-footer-content">
          {/* Bloco de Status do Sistema */}
          <div className="footer-status-block">
            <p className="blink-text"> SISTEMA_OPERACIONAL: V.1972</p>
            <p> STATUS: ONLINE [SINAL_VHF_ESTÁVEL]</p>
            <p> MEMÓRIA: 2KB RAM DISPONÍVEL</p>
          </div>

          {/* Bloco Central - Copyright e Botão Mestre */}
          <div className="footer-info-block">
            <p className="retro-copyright">ESTAÇÃO_RETRÔ // (C) 1972-1990 GAMEVERSE_STORE</p>
            <button className="retro-power-btn" onClick={handlePowerOff}>
              [ TERMINAR_SESSÃO ]
            </button>
            <p className="retro-tagline">"PRESERVANDO A ORIGEM DO PIXEL"</p>
          </div>

          {/* Bloco de Links Estilizados */}
          <div className="footer-links-block">
            <p>SIGA_O_SINAL:</p>
            <div className="retro-social-links">
              <a href="#">[ GHUB ]</a>
              <a href="#">[ LINKD ]</a>
              <a href="#">[ DSCD ]</a>
            </div>
          </div>
        </div>
        
        <div className="retro-footer-bottom-bar">
          <span>LOC: FORTALEZA_CE_BR</span>
          <span>TIME: {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}