import React, { useRef, useEffect } from 'react';

const SpeedDuelCanvas = ({ color1 = "#e60012", color2 = "#005bb6" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    // --- CONFIGURAÇÃO CORRIGIDA ---
    // p1 persegue, p2 foge. Estão em Y:70, mas com X's diferentes.
    let p1 = { x: 100, y: 70, w: 25, h: 25, color: color1, health: 100, name: "SNES", hitFlash: 0 };
    let p2 = { x: width - 150, y: 70, w: 25, h: 25, color: color2, health: 100, name: "MEGA", hitFlash: 0 };
    
    let bullets = [];
    let bgStars = Array.from({ length: 40 }, () => ({ x: Math.random() * width, y: Math.random() * height, s: Math.random() * 6 + 2 }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Fundo em movimento rápido (Parallax)
      ctx.fillStyle = "#fff";
      bgStars.forEach(star => {
        star.x -= star.s;
        if (star.x < 0) star.x = width;
        ctx.fillRect(star.x, star.y, 2, 2);
      });

      // --- LÓGICA DE MOVIMENTO CORRIGIDA (Perseguição) ---
      // Eles flutuam em X e Y para simular combate em alta velocidade
      const floatX = Math.sin(Date.now() * 0.003) * 30;
      const floatY = Math.cos(Date.now() * 0.003) * 10;
      
      const p1Current = { x: p1.x + floatX, y: p1.y + floatY };
      const p2Current = { x: p2.x + floatX * 0.8, y: p2.y - floatY * 0.8 };

      // Atirar (Só atira se o combate estiver ativo)
      if (Math.random() < 0.04 && p1.health > 0 && p2.health > 0) {
        // p1 (atrás) atira para a frente (+dx)
        bullets.push({ x: p1Current.x + p1.w + 5, y: p1Current.y + p1.h/2, dx: 8, color: p1.color, owner: 1 });
        // p2 (na frente) atira para trás (-dx)
        bullets.push({ x: p2Current.x - 10, y: p2Current.y + p2.h/2, dx: -8, color: p2.color, owner: 2 });
      }

      // --- LÓGICA DE PROJÉTEIS E COLISÃO CORRIGIDA ---
      bullets = bullets.filter(b => {
        b.x += b.dx;
        ctx.fillStyle = "#fff"; // Cor do "brilho" do tiro
        ctx.fillRect(b.x, b.y, 8, 3); // Tiro mais visível

        // Colisão Baseada em Perseguição
        if (b.owner === 1 && b.x > p2Current.x && b.x < p2Current.x + p2.w && b.y > p2Current.y && b.y < p2Current.y + p2.h) {
          p2.health = Math.max(0, p2.health - 5);
          p2.hitFlash = 5; // Tempo que pisca branco
          return false;
        }
        if (b.owner === 2 && b.x < p1Current.x + p1.w && b.x > p1Current.x && b.y > p1Current.y && b.y < p1Current.y + p1.h) {
          p1.health = Math.max(0, p1.health - 5);
          p1.hitFlash = 5; // Tempo que pisca branco
          return false;
        }
        return b.x > 0 && b.x < width;
      });

      // --- DESENHAR PERSONAGENS COM FLASH ---
      [ { p: p1, cur: p1Current, isLeading: false }, { p: p2, cur: p2Current, isLeading: true } ].forEach(({ p, cur, isLeading }) => {
  if (p.health > 0) {
    // Nome e Vida
    ctx.fillStyle = "#fff";
    ctx.font = "8px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText(p.name, cur.x + p.w/2, cur.y - 15);
    
    ctx.fillStyle = "#333";
    ctx.fillRect(cur.x, cur.y - 8, p.w, 4);
    ctx.fillStyle = p.color;
    ctx.fillRect(cur.x, cur.y - 8, (p.w * p.health) / 100, 4);

    // Sprite com Flash de Dano
    ctx.fillStyle = p.hitFlash > 0 ? "#fff" : p.color;
    if (p.hitFlash > 0) p.hitFlash--;
    ctx.fillRect(cur.x, cur.y, p.w, p.h);
    
    // Olho: Agora usando a lógica de quem está na frente (isLeading)
    ctx.fillStyle = "#000";
    const eyeX = isLeading ? cur.x + 18 : cur.x + 3; // Olha para a frente ou para trás
    ctx.fillRect(eyeX, cur.y + 6, 4, 4);
  }
});
      // Resetar vida se um morrer
      if (p1.health <= 0 || p2.health <= 0) {
        setTimeout(() => { p1.health = 100; p2.health = 100; }, 2000);
      }

      requestAnimationFrame(animate);
    };
    animate();
  }, [color1, color2]);

  return (
    <div className="duel-canvas-wrapper speed-style">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default SpeedDuelCanvas;