import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [rankings, setRankings] = useState(() => {
    const saved = localStorage.getItem('gv_rankings');
    return saved ? JSON.parse(saved) : { searchedTerms: {}, topGames: {} };
  });

  useEffect(() => {
    localStorage.setItem('gv_rankings', JSON.stringify(rankings));
  }, [rankings]);

  const getCleanTerm = (term) => {
    return term.trim().toLowerCase()
      .replace(/\bjogos? de\b/g, "")
      .replace(/\bgames? de\b/g, "")
      .trim();
  };

  // Envolvemos em useCallback para a referência não mudar a cada render
  const trackSearch = useCallback((term) => {
    const cleanTerm = getCleanTerm(term);
    if (!cleanTerm) return;
    
    setRankings(prev => ({
      ...prev,
      searchedTerms: {
        ...prev.searchedTerms,
        [cleanTerm]: (prev.searchedTerms[cleanTerm] || 0) + 1
      }
    }));
  }, []);

  const trackGameAccess = useCallback((gameTitle) => {
    if (!gameTitle) return;
    
    setRankings(prev => ({
      ...prev,
      topGames: {
        ...prev.topGames,
        [gameTitle]: (prev.topGames[gameTitle] || 0) + 1
      }
    }));
  }, []);

  return (
    <StatsContext.Provider value={{ rankings, trackSearch, trackGameAccess }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);