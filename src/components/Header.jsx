import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaShoppingCart, FaFire, FaUserCircle, 
  FaGamepad, FaHome, FaSearch, FaHistory // Adicionei FaHistory para o ícone retrô
} from "react-icons/fa";
import { useStats } from '../context/statsContext';
import { useAchievements } from '../context/AchievementContext'; // Importando as conquistas

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { trackSearch } = useStats();
  const { stats } = useAchievements(); // Pegando as estatísticas de conquistas
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica se a conquista ID 99 (Anomalia) foi desbloqueada
  const hasRetroUnlocked = stats.unlockedIds.includes(99);

  useEffect(() => {
    const user = localStorage.getItem('user_logged');
    setIsLogged(!!user);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      trackSearch(searchTerm);
      navigate(`/products?search=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo-brand">GameVerse</Link>
      
      <form className="search-bar-container" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Buscar no multiverso..." 
          className="header-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>

      <nav className="nav-menu">
        <Link to="/" className="nav-btn">
          Home <FaHome style={{ marginLeft: '5px' }} />
        </Link>

        <Link to="/products" className="nav-btn">
          Produtos <FaGamepad style={{ marginLeft: '5px' }} />
        </Link>

        <Link to="/news" className="nav-btn">
          <FaFire style={{ marginRight: '5px', color: '#ff4500' }} /> 
          Notícias
        </Link>

        {/* BOTÃO MODO RETRÔ - APARECE APENAS SE DESBLOQUEADO */}
        {hasRetroUnlocked && (
          <Link to="/retro" className="nav-btn retro-access-btn">
            <FaHistory style={{ marginRight: '5px', color: '#33ff33' }} />
            Retro
          </Link>
        )}

        {isLogged ? (
          <Link to="/profile" className="nav-btn profile-highlight">
            Perfil
            <FaUserCircle style={{ marginLeft: '5px', color: '#a78bfa' }} />
          </Link>
        ) : (
          <Link to="/login" className="nav-btn">
            Login/Cadastro
            <FaUserCircle style={{ marginLeft: '5px', color: 'blueviolet' }} />
          </Link>
        )}
        
        <div className="cart-wrapper">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-badge">3</span>
        </div>
      </nav>
    </header>
  );
}