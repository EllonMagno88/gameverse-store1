import React, { useMemo } from 'react';
import GameCard from "../components/GameCard";
import { games } from "../data/games";
import RankingSection from "../components/RankingSection";
import Newsletter from "../components/NewsLetter";
import { useStats } from "../context/statsContext"; // Importar o contexto
import "../components/Banner.css";

export default function Home() {
  const { rankings } = useStats();

  // Lógica para pegar os jogos mais acessados
  const featuredGames = useMemo(() => {
    const topGamesData = rankings.topGames || {};
    
    // Se não houver dados de acesso ainda, mostramos os 4 primeiros por padrão
    if (Object.keys(topGamesData).length === 0) {
      return games.slice(0, 4);
    }

    // 1. Criamos um array dos títulos ordenados pelo número de acessos (Top 4)
    const topTitles = Object.entries(topGamesData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([title]) => title);

    // 2. Filtramos nosso banco de dados para encontrar os objetos desses jogos
    const sortedGames = topTitles.map(title => 
      games.find(g => g.title === title)
    ).filter(Boolean); // Remove nulos caso algum título não bata

    // 3. Se o ranking tiver menos de 4 jogos, preenchemos o resto com os originais
    if (sortedGames.length < 4) {
      const remaining = games.filter(g => !sortedGames.includes(g));
      return [...sortedGames, ...remaining].slice(0, 4);
    }

    return sortedGames;
  }, [rankings.topGames]);

  return (
    <main>
      <section className="banner-container">
        <h1>Bem-vindo ao GameVerse Store!</h1>
        <p>Descubra os melhores jogos digitais e promoções do mundo gamer.</p>
        <button className="banner-button">Ver todos os jogos</button>
        <img src="/assets/banner-game.png" alt="Banner Game" className="banner-image"/>
      </section>

      {/* Título dinâmico para os mais populares */}
      <h2 style={{ textAlign: 'center', color: '#fff', marginTop: '60px' }}>
        Mais Populares no Momento
      </h2>

      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
        {featuredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>

      <div style={{ background: 'rgba(0,0,0,0.2)', marginTop: '80px', paddingTop: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#fff' }}>Estatísticas da Comunidade</h2>
        <RankingSection />
      </div>

      <Newsletter />
    </main>
  );
}