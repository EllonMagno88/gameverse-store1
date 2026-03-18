import React, { useEffect, useMemo, useRef } from 'react'; // 1. Importamos useRef
import { useParams } from 'react-router-dom';
import { games } from '../data/games'; 
import { gameDetailsData } from '../data/gameDetailsData'; 
import { useAchievements } from '../context/AchievementContext';
import { useStats } from '../context/statsContext'; // Obs: Corrigi para S maiúsculo (StatsContext)
import { 
  FaTrophy, FaExternalLinkAlt, FaGamepad, FaInfoCircle, 
  FaYoutube, FaLightbulb, FaShoppingCart, FaSteam, 
  FaPlaystation, FaXbox, FaGlobe, 
} from 'react-icons/fa';

export default function GameDetails() {
  const { id } = useParams();
  const { completeGameView } = useAchievements();
  const { trackGameAccess } = useStats(); 
  
  // 2. Criamos a ref para guardar qual foi o último jogo contabilizado
  const lastTrackedId = useRef(null);

  const { basicInfo, extraInfo } = useMemo(() => {
    const numericId = Number(id);
    return {
      basicInfo: games.find(g => g.id === numericId),
      extraInfo: gameDetailsData[numericId] || gameDetailsData[id]
    };
  }, [id]);

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'steam': return <FaSteam />;
      case 'psn':
      case 'playstation': return <FaPlaystation />;
      case 'xbox': return <FaXbox />;
      default: return <FaGlobe />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!basicInfo || !extraInfo) return;

    // 3. TRAVA DE SEGURANÇA: Só rastreia se o ID for diferente do último rastreado
    if (lastTrackedId.current !== id) {
      trackGameAccess(basicInfo.title);
      lastTrackedId.current = id; // Atualiza a ref para o ID atual, bloqueando repetições
    }
    
    const FIVE_MINUTES = 5 * 60 * 1000;
    const timer = setTimeout(() => {
      completeGameView();
    }, FIVE_MINUTES);

    return () => clearTimeout(timer);
  }, [id, basicInfo, extraInfo, trackGameAccess, completeGameView]);

  if (!basicInfo || !extraInfo) {
    return (
      <div className="game-details-page loading-screen">
        <h2 className="loading-text">Carregando dados do universo...</h2>
      </div>
    );
  }

  return (
    <main className="game-details-page">
      {/* 1. SEÇÃO TÍTULO */}
      <header className="page-header-banner">
        <h1 className="game-main-title">{basicInfo.title}</h1>
      </header>

      <div className="main-content-limiter">
        
        {/* 2. SEÇÃO INFORMAÇÕES GERAIS */}
        <section className="detail-section glass-box info-geral">
          <div className="section-header">
            <h2 className="section-subtitle"><FaInfoCircle /> Informações Gerais</h2>
          </div>
          <div className="info-content-text">
            {extraInfo.generalInfo.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        </section>

        {/* 3. SEÇÃO FOTOS */}
        <section className="detail-section glass-box galeria-fotos">
          <div className="section-header">
            <h2 className="section-subtitle"><FaGamepad /> Galeria de Imagens</h2>
          </div>
          <div className="fixed-photo-square">
            {extraInfo.screenshots.map((url, i) => (
              <div key={i} className="photo-frame">
                <img src={url} alt="Screenshot" className="fixed-img" />
              </div>
            ))}
          </div>
        </section>

        {/* 4. SEÇÃO TRAILER */}
        <section className="detail-section glass-box trailer-oficial">
          <div className="section-header">
            <h2 className="section-subtitle"><FaYoutube color="#ff0000" /> Trailer Oficial</h2>
          </div>
          <div className="video-player-container">
            <iframe
              src={`https://www.youtube.com/embed/${extraInfo.trailerId}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* 5. SEÇÃO CURIOSIDADES */}
        <section className="detail-section glass-box curiosidades-jogo">
          <div className="section-header">
            <h2 className="section-subtitle"><FaLightbulb color="#ffd700" /> Curiosidades</h2>
          </div>
          <ul className="curiosity-list-modern">
            {extraInfo.curiosities.map((item, i) => (
              <li key={i} className="curiosity-item-modern">
                <div className="c-number">{i + 1}</div>
                <div className="c-text">
                  <h4>{item.text}</h4>
                  <p>{item.details}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. SEÇÃO NOTAS E PREMIAÇÕES */}
        <section className="detail-section glass-box critic-reviews-modern">
          <div className="section-header">
            <h2 className="section-subtitle"><FaTrophy color="#ffd700" /> Notas e Prêmios</h2>
          </div>
          <div className="critic-grid-layout">
            <div className="critic-table-wrapper">
              <table className="modern-rating-table">
                <thead>
                  <tr><th>Publicação</th><th>Nota</th></tr>
                </thead>
                <tbody>
                  {Object.entries(extraInfo.criticReviews).map(([pub, score]) => (
                    <tr key={pub}>
                      <td className="pub-name">{pub}</td>
                      <td className="pub-score">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="awards-modern-box">
              <h3>Destaques</h3>
              {extraInfo.awards.map((award, i) => (
                <div key={i} className="award-badge-modern">
                  <span>🏆 {award}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SEÇÃO LINKS DE COMPRA */}
        <section className="detail-section glass-box links-compra">
          <div className="section-header">
            <h2 className="section-subtitle"><FaShoppingCart /> Onde Jogar</h2>
          </div>
          <div className="buy-buttons-modern-grid">
            {Object.entries(extraInfo.buyLinks).map(([platform, link]) => (
              <a 
                key={platform} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modern-buy-btn"
              >
                <div className="platform-info">
                  <span className="platform-icon">{getPlatformIcon(platform)}</span>
                  <span className="platform-name">{platform.toUpperCase()}</span>
                </div>
                <FaExternalLinkAlt size={12} className="external-icon" />
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}