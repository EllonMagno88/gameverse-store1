import React from 'react';
import { FaTrophy, FaLock, FaPowerOff, FaGamepad, FaMicrochip } from 'react-icons/fa';
// Importação do useAchievements mantida para estatísticas gerais (gamesExplored)
import { useAchievements } from '../context/AchievementContext'; 
import { retroGames } from '../data/gamesDB'; // Ajuste o caminho se necessário
import '../components/RetroProfile.css';

export default function RetroProfile() {
  const { stats } = useAchievements(); // estatísticas originais (gamesExplored)
  const username = localStorage.getItem('user_name') || 'PLAYER 1';

  // Extraímos todas as conquistas de todos os jogos do gamesDB em um único array
  const allRetroAchievements = retroGames.flatMap(game => 
    game.achievements.map(ach => ({
      ...ach,
      gameTitle: game.title,
      console: game.consoleId.toUpperCase()
    }))
  );

  // --- O PULO DO GATO: LER DO LOCALSTORAGE ---
  // Lemos os IDs desbloqueados do LocalStorage (unlocked_retro_ids)
  // Se não houver nada, usamos stats.unlockedIds como fallback (apenas por segurança)
  const unlockedRetroIds = JSON.parse(localStorage.getItem('unlocked_retro_ids')) || stats.unlockedIds || [];
  
  // Cálculo de progresso exclusivo do universo Retro baseado nos IDs que lemos do LocalStorage
  const unlockedRetroCount = allRetroAchievements.filter(ach => 
    unlockedRetroIds.includes(ach.id)
  ).length;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };

  return (
    <main className="retro-profile-container">
      <div className="crt-overlay"></div>

      <div className="retro-profile-wrapper">
        <header className="retro-card-header">
          <div className="avatar-frame">
            <img 
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}&backgroundColor=b6e3f4`} 
              alt="Avatar" 
            />
          </div>
          
          <div className="player-stats-box">
            <h2 className="retro-username">{username}</h2>
            <p className="retro-rank">STATUS: <span className="neon-text">LEGACY COLLECTOR</span></p>
            
            <div className="stats-grid-mini">
              <div className="stat-node">
                <FaGamepad className="stat-icon" /> 
                <span className="stat-label">GAMES:</span>
                <span className="stat-value">{retroGames.length}</span>
              </div>
              <div className="stat-node">
                <FaMicrochip className="stat-icon" /> 
                <span className="stat-label">CORES:</span>
                <span className="stat-value">ACTIVE</span>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-shut-down">
            <FaPowerOff /> SHUT DOWN
          </button>
        </header>

        <section className="retro-quests">
          <h3 className="retro-section-title">
            <FaTrophy /> TROPHY ROOM: {unlockedRetroCount}/{allRetroAchievements.length}
          </h3>
          
          <div className="retro-quests-grid">
            {allRetroAchievements.map(ach => {
              // Verifica o desbloqueio usando a lista que lemos do LocalStorage
              const isUnlocked = unlockedRetroIds.includes(ach.id);

              return (
                <div key={ach.id} className={`quest-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <div className="quest-icon-wrapper">
                    <span className="retro-emoji">{isUnlocked ? ach.icon : '❓'}</span>
                  </div>
                  
                  <div className="quest-body">
                    <div className="quest-header-info">
                      <span className="game-origin">{ach.gameTitle}</span>
                      <span className="console-tag">{ach.console}</span>
                    </div>
                    <h4 className="quest-title">{ach.title}</h4>
                    <p className="quest-xp">+{ach.xp} XP</p>
                  </div>

                  {isUnlocked ? (
                    <div className="quest-badge">CLEARED</div>
                  ) : (
                    <div className="quest-lock-status"><FaLock /></div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}