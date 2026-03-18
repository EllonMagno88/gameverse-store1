
import React, { useRef, useEffect } from 'react';

const ConsoleDuelCanvas = ({ console1Name, console2Name, color1 = "#33ff33", color2 = "#ffaa00" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    // Configurações das Navinhas (Pixel Art Simples)
    const shipWidth = 30;
    const shipHeight = 20;

    let ship1 = { x: 50, y: height / 2 - shipHeight / 2, color: color1, name: console1Name, health: 100 };
    let ship2 = { x: width - 50 - shipWidth, y: height / 2 - shipHeight / 2, color: color2, name: console2Name, health: 100 };

    let bullets = [];
    let particles = []; // Para efeitos de explosão

    // Função para desenhar uma navinha pixelada
    const drawShip = (ship, isRival) => {
      ctx.fillStyle = ship.color;
      // Corpo Principal
      ctx.fillRect(ship.x, ship.y, shipWidth, shipHeight);
      // Canhão
      if (!isRival) {
        ctx.fillRect(ship.x + shipWidth, ship.y + shipHeight / 2 - 2, 10, 4);
      } else {
        ctx.fillRect(ship.x - 10, ship.y + shipHeight / 2 - 2, 10, 4);
      }

      // Nome do Console (Fonte Pixel)
      ctx.fillStyle = "#fff";
      ctx.font = "8px 'Press Start 2P'";
      ctx.textAlign = "center";
      ctx.fillText(ship.name, ship.x + shipWidth / 2, ship.y - 10);
      
      // Barra de Vida Simples
      ctx.fillStyle = "#555";
      ctx.fillRect(ship.x, ship.y + shipHeight + 5, shipWidth, 3);
      ctx.fillStyle = ship.color;
      ctx.fillRect(ship.x, ship.y + shipHeight + 5, (shipWidth * ship.health) / 100, 3);
    };

    // Função para criar partículas de explosão
    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: x,
          y: y,
          dx: (Math.random() - 0.5) * 3,
          dy: (Math.random() - 0.5) * 3,
          life: 30,
          color: color
        });
      }
    };

    // Loop de Animação
    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Fundo (Linhas de grade sutis)
      ctx.strokeStyle = "rgba(51, 255, 51, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      // Movimentação Sutil (Flutuação)
      ship1.y = (height / 2 - shipHeight / 2) + Math.sin(frame * 0.05) * 5;
      ship2.y = (height / 2 - shipHeight / 2) + Math.sin(frame * 0.05 + Math.PI) * 5;

      // Atirando (Cadência aleatória)
      if (frame % (Math.floor(Math.random() * 50) + 30) === 0 && ship1.health > 0) {
        bullets.push({ x: ship1.x + shipWidth + 10, y: ship1.y + shipHeight / 2, dx: 4, color: ship1.color, owner: 1 });
      }
      if (frame % (Math.floor(Math.random() * 50) + 30) === 0 && ship2.health > 0) {
        bullets.push({ x: ship2.x - 10, y: ship2.y + shipHeight / 2, dx: -4, color: ship2.color, owner: 2 });
      }

      // Atualizar e Desenhar Balas
      ctx.lineWidth = 2;
      bullets = bullets.filter(bullet => {
        bullet.x += bullet.dx;
        ctx.strokeStyle = bullet.color;
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineTo(bullet.x + bullet.dx * 2, bullet.y);
        ctx.stroke();

        // Colisão
        if (bullet.owner === 1 && bullet.x > ship2.x && bullet.x < ship2.x + shipWidth && bullet.y > ship2.y && bullet.y < ship2.y + shipHeight) {
          ship2.health = Math.max(0, ship2.health - 5);
          createExplosion(bullet.x, bullet.y, ship2.color);
          return false;
        }
        if (bullet.owner === 2 && bullet.x < ship1.x + shipWidth && bullet.x > ship1.x && bullet.y > ship1.y && bullet.y < ship1.y + shipHeight) {
          ship1.health = Math.max(0, ship1.health - 5);
          createExplosion(bullet.x, bullet.y, ship1.color);
          return false;
        }

        // Remover balas fora da tela
        return bullet.x > 0 && bullet.x < width;
      });

      // Atualizar e Desenhar Partículas
      particles = particles.filter(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2); // Partícula pixelada
        return p.life > 0;
      });

      // Desenhar Navinhas
      if (ship1.health > 0) drawShip(ship1, false);
      else {
          ctx.fillStyle = "#ff3333"; ctx.font = "10px 'Press Start 2P'"; ctx.textAlign = "center";
          ctx.fillText("GAME OVER", ship1.x + shipWidth/2, ship1.y + shipHeight/2);
      }

      if (ship2.health > 0) drawShip(ship2, true);
      else {
          ctx.fillStyle = "#ff3333"; ctx.font = "10px 'Press Start 2P'"; ctx.textAlign = "center";
          ctx.fillText("GAME OVER", ship2.x + shipWidth/2, ship2.y + shipHeight/2);
      }
      
      // Resetar vida se um morrer (para o duelo continuar)
      if(ship1.health === 0 || ship2.health === 0) {
          setTimeout(() => {
              ship1.health = 100;
              ship2.health = 100;
          }, 2000);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Limpeza se necessário (o requestAnimationFrame se resolve sozinho se o componente for desmontado, mas é boa prática)
    };
  }, [console1Name, console2Name, color1, color2]);

  return (
    <div className="duel-canvas-wrapper">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default ConsoleDuelCanvas;