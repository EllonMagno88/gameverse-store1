const API_KEY = '6189c5e070564b618bdd690bf34cc716';

export const fetchLiveNews = async () => {
  try {
    // Aumentamos os termos de busca para garantir volume de dados
    const query = encodeURIComponent('games OR "video games" OR playstation OR xbox OR nintendo');
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=relevancy&pageSize=20&apiKey=${API_KEY}`
    );
    
    const data = await response.json();

    // LOG DE DEPURAÇÃO: Abra o console (F12) e veja se está vindo 20 itens
    console.log("Quantidade de notícias recebidas:", data.articles?.length);

    if (!data.articles) return [];

    return data.articles.map((article, index) => ({
      id: `news-${index}-${article.publishedAt}`, // ID mais robusto
      title: article.title,
      description: article.description,
      date: new Date(article.publishedAt).toLocaleDateString('pt-BR'),
      source: article.source.name,
      image: article.urlToImage,
      externalLink: article.url
    }));
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};