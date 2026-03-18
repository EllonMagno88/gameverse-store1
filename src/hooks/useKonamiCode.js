import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../context/AchievementContext';

export const useKonamiCode = () => {
  const navigate = useNavigate();
  const { unlockSecret } = useAchievements();
  
  // O código alvo (tudo em minúsculo para evitar erro de CapsLock)
  const konamiCode = [
    'arrowup', 'arrowup', 
    'arrowdown', 'arrowdown', 
    'arrowleft', 'arrowright', 
    'arrowleft', 'arrowright', 
    'b', 'a'
  ];

  useEffect(() => {
    let input = [];

    const onKeyDown = (e) => {
      // 1. Normaliza a tecla digitada
      const key = e.key.toLowerCase();
      
      // 2. Adiciona ao array local (mais confiável que o estado do useState aqui)
      input.push(key);
      input = input.slice(-10); // Mantém apenas os últimos 10

      const inputStr = input.join(',');

      // --- FEEDBACKS POR ETAPA ---

      // Feedback 1: Setas (↑↑↓↓)
      if (inputStr.includes('arrowup,arrowup,arrowdown,arrowdown')) {
        applyAnomaly('shake-light', 'rgba(124, 58, 237, 0.2)');
      }

      // Feedback 2: Lados (←→←→)
      if (inputStr.includes('arrowleft,arrowright,arrowleft,arrowright')) {
        applyAnomaly('shake-heavy', 'rgba(239, 68, 68, 0.3)');
      }

      // 3. VALIDAÇÃO FINAL
      if (JSON.stringify(input) === JSON.stringify(konamiCode)) {
        triggerPortal();
      }
    };

    const applyAnomaly = (className, color) => {
      document.body.classList.add(className);
      const flash = document.createElement('div');
      flash.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:${color};z-index:10000;pointer-events:none;`;
      document.body.appendChild(flash);
      
      setTimeout(() => {
        document.body.classList.remove(className);
        flash.remove();
      }, 500);
    };

   const triggerPortal = () => {
  // 1. Feedback Visual Imediato
  document.body.style.transition = "all 1s ease-in";
  document.body.style.filter = "invert(1) blur(15px) contrast(2)";
  document.body.style.transform = "scale(0.9)";

  // 2. Tenta disparar a conquista (se o contexto estiver pronto)
  try {
    unlockSecret();
  } catch (err) {
    console.warn("AchievementContext ainda não carregou, mas vamos prosseguir.");
  }

  // 3. O REDIRECIONAMENTO COM TIMEOUT
  setTimeout(() => {
    // Reset dos efeitos para não bugar a próxima página
    document.body.style.filter = "none";
    document.body.style.transform = "none";
    
    // Navegação via React Router
    navigate('/retro');
    
    // BACKUP: Se o navigate falhar, usamos o redirecionamento nativo
    setTimeout(() => {
      if (window.location.pathname !== '/retro') {
        window.location.href = '/retro';
      }
    }, 100);

  }, 1200);
};

    window.addEventListener('keydown', onKeyDown);
    
    // Limpeza fundamental para evitar múltiplos listeners
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, unlockSecret]); 
};