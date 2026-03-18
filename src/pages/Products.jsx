import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import BannerSlider from '../components/BannerSlider';
import { FaSearch } from 'react-icons/fa';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search');
    
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
      setActiveCategory("Todos"); 
    }
  }, [location.search]);

  // --- LÓGICA DE FILTRO REFINADA ---
  
  // 1. Extrair todas as categorias
  const allCategories = ["Todos", ...new Set(games.flatMap(game => game.category))];

  // 2. Função para limpar o termo de busca (Remove "Jogos de", "Games de", etc)
  const getCleanSearch = (text) => {
    return text.toLowerCase()
      .replace(/\bjogos? de\b/g, "") // Remove "jogo de" ou "jogos de"
      .replace(/\bgames? de\b/g, "") // Remove "game de" ou "games de"
      .trim();
  };

  // 3. Aplicação do Filtro
  const filteredGames = games.filter(game => {
    // Filtro do botão de categoria
    const matchesCategory = activeCategory === "Todos" 
      ? true 
      : game.category.includes(activeCategory);
      
    const cleanSearch = getCleanSearch(searchTerm);

    // Se a busca estiver vazia, filtra apenas pela categoria do botão
    if (!cleanSearch) return matchesCategory;

    // Busca no Título
    const matchesTitle = game.title.toLowerCase().includes(cleanSearch);

    // Busca na Categoria (Evita o bug Ação vs Simulação)
    const matchesCategorySearch = game.category.some(cat => {
      const catLower = cat.toLowerCase();
      
      // Se o usuário buscou especificamente "ação", não deixamos bater com "simulação"
      if (cleanSearch === "ação" && catLower === "simulação") return false;
      
      // Verifica se o termo limpo está contido na categoria
      return catLower.includes(cleanSearch);
    });
    
    return matchesCategory && (matchesTitle || matchesCategorySearch);
  });

  return (
    <main className="products-page">
      <BannerSlider />

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Pesquisar no GameVerse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <span className="results-count">
            {filteredGames.length} {filteredGames.length === 1 ? 'resultado' : 'resultados'}
          </span>
        )}
      </div>

      <div className="filter-container">
        {allCategories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="games-list-vertical">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} variant="horizontal" />
          ))
        ) : (
          <div className="no-results-message">
            <p>Ops! Nenhum jogo encontrado para "{searchTerm}".</p>
          </div>
        )}
      </div>
    </main>
  );
}