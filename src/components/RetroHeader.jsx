import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './RetroHeader.css';

export default function RetroHeader() {
  const location = useLocation();

  return (
    <header className="retro-header-container">
      {/* Luz de Status do Sistema */}
      <div className="system-led-bar">
        <span className="led green"></span>
        <span className="system-text">CPU_STATUS: OK // BUS_SPEED: 33MHz</span>
      </div>

      <div className="retro-logo-row">
        <h1 className="retro-brand" data-text="GAMEVERSE_RETRÔ">GAMEVERSE_RETRÔ</h1>
      </div>
      
      <nav className="retro-nav-bar">
        <div className="retro-nav-group">
          {/* Rota corrigida para /retro/consoles */}
          <Link to="/retro/consoles" className={`retro-link ${location.pathname === '/retro/consoles' ? 'active' : ''}`}>
            [ CONSOLES ]
          </Link>
          <Link to="/retro/jogos" className="retro-link">
            [ JOGOS ]
          </Link>
          <Link to="/retro/hall" className="retro-link">
            [ HALL_DA_FAMA ]
          </Link>
          <Link to="/retro/profile" className={`retro-link ${location.pathname === '/retro/profile' ? 'active' : ''}`}>
            [ PERFIL ]
          </Link>
          <Link to="/" className="retro-link exit-system">
            [ VOLTAR_AO_PRESENTE ]
          </Link>
        </div>
      </nav>
      
      <div className="retro-double-line"></div>
    </header>
  );
}