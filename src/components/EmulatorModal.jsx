import React, { useEffect, useRef, useState } from 'react';
import { Nostalgist } from 'nostalgist';
import './EmulatorModal.css';

const EmulatorModal = ({ game, onClose }) => {
  const [status, setStatus] = useState('Iniciando...');
  const nostalgistRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const coreMap = {
    nes: 'fceumm',
    snes: 'snes9x',
    megadrive: 'genesis_plus_gx',
    sms: 'genesis_plus_gx',
    gbc: 'gambatte',
    gba: 'mgba'
  };

  useEffect(() => {
    let isMounted = true;

    async function launchGame() {
      await new Promise(resolve => setTimeout(resolve, 150));

      if (!game || !canvasRef.current || !isMounted) return;

      const selectedCore = coreMap[game.consoleId] || 'fceumm';

      try {
        if (isMounted) setStatus(`Carregando ${game.title}...`);

        nostalgistRef.current = await Nostalgist.launch({
          element: canvasRef.current,
          core: selectedCore,
          rom: `/assets/roms/${game.consoleId}/${game.id}.lib`,
          
          // Otimizações de performance estáveis
          cache: true, 
          waitForInteraction: false,
          
          retroarchConfig: {
            video_vsync: true,
            video_driver: 'gl',
            video_threaded: true, // Melhora a fluidez em cores como o de GBA/SNES
            rewind_enable: false, // Economiza muita RAM
          }
        });

        if (isMounted) setStatus('Rodando!');
      } catch (err) {
        console.error('Erro no Emulador:', err);
        if (isMounted) setStatus("Erro ao iniciar. Tente novamente.");
      }
    }

    launchGame();

    // Atalho ESC para fechar
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleEsc);
      if (nostalgistRef.current) {
        nostalgistRef.current.exit();
      }
    };
  }, [game, onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="game-title-running">● {game.title}</span>
          <button className="close-modal" onClick={onClose}>[ FECHAR ESC ]</button>
        </div>
        
        <div className="emulator-screen" ref={containerRef}>
          <canvas 
            ref={canvasRef} 
            className={status === 'Rodando!' ? 'canvas-active' : 'canvas-hidden'}
          />
          
          {status !== 'Rodando!' && (
            <div className="loader-container">
              <div className="pixel-loader"></div>
              <p className="loading-text">{status}</p>
            </div>
          )}
        </div>

        <div className="controls-hint">
          <strong>CONTROLES:</strong> Setas (Mover) | Z (A) | X (B) | Enter (Start) | Shift (Select)
        </div>
      </div>
    </div>
  );
};

export default EmulatorModal;