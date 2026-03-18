import React, { useEffect } from "react";
import { AchievementProvider } from './context/AchievementContext.jsx';
import { Routes, Route, useLocation } from "react-router-dom"; // Adicionado useLocation
import Header from "./components/Header.jsx";
import RetroHeader from "./components/RetroHeader.jsx"; // Novo componente
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import News from "./pages/News.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import RetroHome from "./pages/RetroHome.jsx";
import GameDetails from "./components/GameDetails.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatsProvider } from './context/statsContext.jsx';
import Footer from './components/Footer';
import RetroFooter from './components/RetroFooter'; // Novo componente
import { useKonamiCode } from './hooks/useKonamiCode';
import RetroConsoles from './pages/RetroConsoles';
import RetroGames from './pages/RetroGames';
import RetroProfile from './pages/RetroProfile';
import HallDaFama from './pages/HallDaFama';

function AppContent() {
  useKonamiCode();
  const location = useLocation();
  const isRetroMode = location.pathname.startsWith('/retro');

  // --- O SEGREDO ESTÁ AQUI ---
  useEffect(() => {
    if (isRetroMode) {
      document.body.classList.add('retro-mode-active');
    } else {
      document.body.classList.remove('retro-mode-active');
    }
  }, [isRetroMode]);
  // ---------------------------

  return (
   // Mantemos a classe aqui também para garantir o escopo interno
    <div className={isRetroMode ? "retro-mode-active" : "app-container"}>
      {isRetroMode ? <RetroHeader /> : <Header />}
      
      
      <main>
        <Routes>
          {/* Rotas Modernas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/product/:id" element={<GameDetails />} />

          {/* Universo Retrô (Podemos adicionar mais rotas aqui depois) */}
          <Route path="/retro" element={<RetroHome />} />
          <Route path="/retro/consoles" element={<RetroConsoles />} />
          <Route path="/retro/jogos" element={<RetroGames />} />
          <Route path="/retro/profile" element={<RetroProfile />} />
          <Route path="/retro/hall" element={<HallDaFama />} />
        </Routes>
      </main>

      {/* FOOTER DINÂMICO */}
      {isRetroMode ? <RetroFooter /> : <Footer />}

      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        theme={isRetroMode ? "light" : "dark"} // Toast também muda de vibe
        pauseOnHover
        draggable
      />
    </div>
  );
}

function App() {
  return (
    <StatsProvider>
      <AchievementProvider>
        <AppContent />
      </AchievementProvider>
    </StatsProvider>
  );
}

export default App;