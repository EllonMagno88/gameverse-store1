import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre Login e Cadastro
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui simularemos o login por enquanto
    localStorage.setItem('user_logged', 'true');
    localStorage.setItem('user_name', e.target.username.value);
    navigate('/'); // Redireciona para Home
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="page-title">{isLogin ? 'PLAYER LOGIN' : 'NEW PLAYER'}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>NICKNAME</label>
            <input type="text" name="username" required placeholder="Digite seu nome de herói..." />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>EMAIL</label>
              <input type="email" name="email" required placeholder="seu@email.com" />
            </div>
          )}

          <div className="input-group">
            <label>PASSWORD</label>
            <input type="password" name="password" required placeholder="********" />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'ENTER UNIVERSE' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Novo por aqui?" : "Já tem uma conta?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Cadastre-se' : ' Faça Login'}
          </span>
        </p>
      </div>
    </div>
  );
}