import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useAchievements } from '../context/AchievementContext'; // Importando o hook global

export default function Profile() {
  const navigate = useNavigate();
  const { stats, ACHIEVEMENT_LIST } = useAchievements(); // Pegando dados do contexto
  const username = localStorage.getItem('user_name') || 'Player 1';
  
  const handleLogout = () => {
    localStorage.clear();
    // Opcional: recarregar para limpar estados globais se necessário
    window.location.href = '/login'; 
  };

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div className="avatar-large">{username[0].toUpperCase()}</div>
        <h2 className="page-title">{username}</h2>
        
        {/* Mostra um pequeno resumo do progresso */}
        <div className="user-stats-summary">
          <span>Notícias lidas: <strong>{stats.newsRead}</strong></span>
          <span style={{ marginLeft: '15px' }}>Jogos explorados: <strong>{stats.gamesExplored}</strong></span>
        </div>

        <button onClick={handleLogout} className="logout-btn" style={{ marginTop: '20px' }}>
          <FaSignOutAlt /> Sair da Conta
        </button>
      </div>

      <section className="achievements-section">
        <h3><FaTrophy style={{color: '#ffd700'}} /> Minhas Conquistas</h3>
        
        <div className="achievements-grid">
          {ACHIEVEMENT_LIST.map(ach => {
            // Verifica se o ID desta conquista está no array de desbloqueados do stats
            const isUnlocked = stats.unlockedIds.includes(ach.id);

            return (
              <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">
                  {isUnlocked ? <FaTrophy /> : <FaLock />}
                </div>
                <div className="achievement-info">
                  <h4>{ach.title}</h4>
                  <p>{ach.desc}</p>
                  
                  {/* Barra de progresso visual para conquistas bloqueadas */}
                  {!isUnlocked && ach.type !== 'account' && (
                    <div className="mini-progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${Math.min(( (ach.type === 'news' ? stats.newsRead : stats.gamesExplored) / ach.goal) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                {!isUnlocked && <div className="lock-overlay">BLOQUEADO</div>}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}