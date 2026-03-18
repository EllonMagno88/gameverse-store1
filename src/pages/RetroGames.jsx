import React, { useState } from 'react';
import { retroGames } from '../data/gamesDB';
import { consoleData } from '../data/consoleDB';
// Importação do useAchievements mantida apenas para consistência, se necessário para outras estatísticas
import { useAchievements } from '../context/AchievementContext'; 
import '../components/RetroGames.css';
import EmulatorModal from '../components/EmulatorModal';

const RetroGames = () => {
  const [filter, setFilter] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  
  // Acessamos o contexto original para estatísticas gerais (como gamesExplored)
  const achievementContext = useAchievements();
  const unlockAchievementModern = achievementContext?.unlockAchievement;

  const filteredGames = filter === 'all' 
    ? retroGames 
    : retroGames.filter(game => {
        const consoleInfo = consoleData.find(c => c.id === game.consoleId);
        return consoleInfo?.gen === parseInt(filter);
      });

  const handlePlay = (game) => {
    console.log("Iniciando fluxo de jogo para:", game.title);

    // --- LÓGICA DE CONQUISTAS RETRO (SALVANDO NO LOCALSTORAGE) ---
    if (game.achievements && game.achievements.length > 0) {
      const currentAchievementId = game.achievements[0].id;
      console.log(`Disparando conquista retro: ${currentAchievementId}`);

      // 1. Pega a lista atual de conquistas retro desbloqueadas do LocalStorage
      let unlockedRetro = JSON.parse(localStorage.getItem('unlocked_retro_ids')) || [];

      // 2. Se o ID ainda não estiver na lista, adiciona
      if (!unlockedRetro.includes(currentAchievementId)) {
        unlockedRetro.push(currentAchievementId);
        
        // 3. Salva a lista atualizada de volta no LocalStorage
        localStorage.setItem('unlocked_retro_ids', JSON.stringify(unlockedRetro));
        console.log("Conquista retro registrada no LocalStorage.");
      } else {
        console.log("Conquista retro já desbloqueada anteriormente.");
      }
    }

    // --- LÓGICA ORIGINAL (OPCIONAL) ---
    // Registramos que um jogo foi explorado no contexto moderno (se a função existir)
    if (unlockAchievementModern) {
      try {
        unlockAchievementModern('retro_explorer_01'); 
        console.log("XP de 'Explorador Retro' enviado ao contexto moderno.");
      } catch (err) {
        console.warn("Erro ao enviar XP ao contexto moderno:", err);
      }
    }

    // Abre o modal de emulação
    setSelectedGame(game);
  };

  const availableGens = [...new Set(retroGames.map(game => {
    return consoleData.find(c => c.id === game.consoleId)?.gen;
  }))].filter(Boolean).sort();

  return (
    <div className="retro-games-container">
      <header className="games-header">
        <h1>BIBLIOTECA DE CLÁSSICOS</h1>
        <div className="generation-filters">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}
          >
            TODOS
          </button>
          {availableGens.map(gen => (
            <button 
              key={gen} 
              onClick={() => setFilter(gen.toString())}
              className={filter === gen.toString() ? 'active' : ''}
            >
              {gen}ª GEN
            </button>
          ))}
        </div>
      </header>

      <div className="games-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-cover">
                <img 
                  src={`/assets/games/${game.id}.jpg`} 
                  alt={game.title} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Retro+Game'; }}
                />
                <div className="game-overlay">
                  <button className="play-button" onClick={() => handlePlay(game)}>
                    JOGAR AGORA
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3>{game.title}</h3>
                <span className="console-tag">{game.consoleId.toUpperCase()}</span>
                <p className="game-description">{game.description}</p>
                <div className="iconic-box">
                  <strong>POR QUE É ÍCONE?</strong>
                  <p>{game.iconicReason}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-games">Nenhum jogo encontrado para esta geração.</div>
        )}
      </div>

      {selectedGame && (
        <EmulatorModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default RetroGames;