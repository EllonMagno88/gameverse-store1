import React from 'react';
import { useAchievements } from '../context/AchievementContext';
import { FaCrown, FaTrophy, FaGamepad } from 'react-icons/fa';
import '../components/HallDaFama.css';

export default function HallDaFama() {
  const { stats } = useAchievements();
  const username = localStorage.getItem('user_name') || 'PLAYER 1';

  // Calculamos o XP real do usuário baseado nas conquistas desbloqueadas
  const userXP = stats.unlockedIds.length * 500 + (stats.gamesExplored * 100);

  // Ranking estático com o usuário inserido dinamicamente
  const ranking = [
    { name: 'HIROSHI_YAU', score: 25500, title: '8-BIT GOD', avatar: '🐉' },
    { name: 'BILLY_MITCHELL', score: 18400, title: 'KING OF HILL', avatar: '👔' },
    { name: username.toUpperCase(), score: userXP, title: 'THE VOYAGER', isUser: true, avatar: '🕹️' },
    { name: 'X_CASPER_X', score: 4200, title: 'SPEEDRUNNER', avatar: '👻' },
    { name: 'RETRO_KID_94', score: 1500, title: 'NEWBIE', avatar: '🍕' },
  ].sort((a, b) => b.score - a.score);

  // Função para retornar o sufixo correto do Rank (1st, 2nd, 3rd...)
  const getRankSuffix = (rank) => {
    if (rank === 1) return 'ST';
    if (rank === 2) return 'ND';
    if (rank === 3) return 'RD';
    return 'TH';
  };

  return (
    <main className="hall-fama-page">
      <div className="crt-overlay"></div>
      
      <div className="hall-container">
        <header className="hall-header">
          <FaCrown className="crown-icon" />
          <h1 className="pixel-title">HALL OF FAME</h1>
          <p className="subtitle">ALL TIME HIGH SCORES</p>
        </header>

        <div className="score-table">
          <div className="table-header">
            <span>RANK</span>
            <span>PLAYER</span>
            <span>TITLE</span>
            <span>SCORE</span>
          </div>

          {ranking.map((player, index) => {
            const rank = index + 1;
            return (
              <div 
                key={index} 
                className={`score-row ${player.isUser ? 'user-row' : ''} rank-${rank}`}
              >
                <span className="rank-num">
                  {rank}{getRankSuffix(rank)}
                </span>
                <span className="player-name">
                  {player.avatar} {player.name}
                </span>
                <span className="player-title">{player.title}</span>
                <span className="player-score">{player.score.toLocaleString()}</span>
              </div>
            );
          })}
        </div>

        <footer className="hall-footer">
          <div className="footer-stats">
            <span><FaTrophy /> {stats.unlockedIds.length} TROPHIES</span>
            <span><FaGamepad /> {stats.gamesExplored} ROMS LOADED</span>
          </div>
          <p className="insert-coin">INSERT COIN TO CONTINUE</p>
        </footer>
      </div>
    </main>
  );
}