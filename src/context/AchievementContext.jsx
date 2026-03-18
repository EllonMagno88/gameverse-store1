import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FaTrophy } from 'react-icons/fa';

const AchievementContext = createContext();

export const ACHIEVEMENT_LIST = [
  { id: 1, title: 'Recruta GameVerse', desc: 'Criou sua conta na plataforma', goal: 1, type: 'account' },
  { id: 2, title: 'Explorador Noturno', desc: 'Leu 5 notícias de games', goal: 5, type: 'news' },
  { id: 3, title: 'Mestre do Review', desc: 'Analisou detalhes de 3 jogos (5 min cada)', goal: 3, type: 'games' },
  { id: 4, title: 'Viciado em Info', desc: 'Leu 20 notícias de games', goal: 20, type: 'news' },
  { id: 99, title: 'Anomalia no Sistema', desc: 'Você encontrou uma fenda na cronologia e acessou arquivos que não deveriam existir.', goal: 1, type: 'secret' },
];


export const AchievementProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('gv_stats');
    return saved ? JSON.parse(saved) : {
      newsRead: 0,
      gamesExplored: 0,
      unlockedIds: [] 
    };
  });

  useEffect(() => {
    localStorage.setItem('gv_stats', JSON.stringify(stats));
  }, [stats]);

  const fireToast = (ach) => {
    toast.success(
      <div>
        <b style={{ color: '#fff' }}>Conquista Desbloqueada!</b>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#a78bfa' }}>{ach.title}</p>
      </div>,
      {
        icon: <FaTrophy color="#ffd700" />,
        style: { background: '#1e1b4b', border: '1px solid #7c3aed', borderRadius: '12px' }
      }
    );
  };

  useEffect(() => {
    ACHIEVEMENT_LIST.forEach(ach => {
      if (stats.unlockedIds.includes(ach.id)) return;

      let reached = false;
      if (ach.type === 'news' && stats.newsRead >= ach.goal) reached = true;
      if (ach.type === 'games' && stats.gamesExplored >= ach.goal) reached = true;
      if (ach.type === 'account') reached = true;

      if (reached) {
        fireToast(ach);
        setStats(prev => ({
          ...prev,
          unlockedIds: [...prev.unlockedIds, ach.id]
        }));
      }
    });
  }, [stats.newsRead, stats.gamesExplored, stats.unlockedIds]); 

  const unlockSecret = useCallback(() => {
  if (!stats.unlockedIds.includes(99)) {
    const ach = ACHIEVEMENT_LIST.find(a => a.id === 99);
    fireToast(ach);
    setStats(prev => ({
      ...prev,
      unlockedIds: [...prev.unlockedIds, 99]
    }));
  }
}, [stats.unlockedIds]);

  // --- CORREÇÃO AQUI: Funções memorizadas ---
  const trackNewsClick = useCallback(() => {
    setStats(prev => ({ ...prev, newsRead: prev.newsRead + 1 }));
  }, []);

  const completeGameView = useCallback(() => {
    setStats(prev => ({ ...prev, gamesExplored: prev.gamesExplored + 1 }));
  }, []);

  return (
    <AchievementContext.Provider value={{ stats, trackNewsClick, completeGameView, unlockSecret, ACHIEVEMENT_LIST }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);