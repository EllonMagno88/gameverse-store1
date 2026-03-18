import React from 'react';
import { useStats } from '../context/statsContext';
import { FaChartLine, FaSearch, FaGamepad, FaTrophy } from 'react-icons/fa';
import './RankingSection.css';

export default function RankingSection() {
  const { rankings } = useStats();

  // Função para transformar o objeto em array, ordenar e pegar o Top 10
  const getTop10 = (data) => {
    return Object.entries(data || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const topSearches = getTop10(rankings.searchedTerms);
  const topGames = getTop10(rankings.topGames);

  return (
    <section className="rankings-wrapper">
      <div className="ranking-column">
        <h3 className="ranking-header">
          <FaSearch className="icon-pulse" /> Top 10 Buscas
        </h3>
        <div className="ranking-list">
          {topSearches.length > 0 ? topSearches.map(([term, count], i) => (
            <div key={term} className={`ranking-card rank-${i + 1}`}>
              <div className="rank-badge">{i + 1}</div>
              <span className="rank-name">{term}</span>
              <span className="rank-stat">{count}x</span>
            </div>
          )) : <p className="empty-msg">Nenhuma busca registrada...</p>}
        </div>
      </div>

      <div className="ranking-column">
        <h3 className="ranking-header">
          <FaGamepad className="icon-pulse" /> Jogos em Alta
        </h3>
        <div className="ranking-list">
          {topGames.length > 0 ? topGames.map(([game, count], i) => (
            <div key={game} className={`ranking-card rank-${i + 1}`}>
              <div className="rank-badge">{i + 1}</div>
              <span className="rank-name">{game}</span>
              <span className="rank-stat">{count} <small>views</small></span>
            </div>
          )) : <p className="empty-msg">Explore os jogos para gerar o ranking!</p>}
        </div>
      </div>
    </section>
  );
}