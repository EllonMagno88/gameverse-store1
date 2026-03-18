import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchLiveNews } from '../services/newsServices';
import '../components/News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const data = await fetchLiveNews();
        const shuffled = data.sort(() => Math.random() - 0.5);
        
        setTimeout(() => {
          setNews(shuffled);
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
        setLoading(false);
      }
    };
    getNews();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Carregando notícias quentes...</p>
      </div>
    );
  }

  return (
    <main className="products-page">
      <h2 className="page-title">GameVerse Live News</h2>
      
      <div className="games-list-vertical">
        {news.length > 0 ? (
          news.map((item, index) => (
            <NewsCard 
              key={item.id || index} 
              item={item} 
              index={index} 
            />
          ))
        ) : (
          <p className="no-news">Nenhuma notícia encontrada no momento.</p>
        )}

        {/* --- A TERCEIRA PISTA: O FINAL DO ENIGMA --- */}
        {!loading && news.length > 0 && (
          <div className="system-glitch-note">
            <p>
              <span className="glitch-code">[SYS_ERR_099]:</span> Fragmentos de memória detectados. 
              Para sincronizar a frequência e restaurar os arquivos corrompidos, 
              insira as chaves de acesso finais: <strong>Input_B</strong> seguido de <strong>Input_A</strong>.
            </p>
            <div className="terminal-cursor"></div>
          </div>
        )}
      </div>
    </main>
  );
}