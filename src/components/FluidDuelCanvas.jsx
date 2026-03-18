import React, { useRef, useEffect } from 'react';

const FluidDuelCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    let particles = [];
    let p1 = { x: 150, y: 75, health: 100, color: "#0044ff", name: "PS2", hit: 0 };
    let p2 = { x: 450, y: 75, health: 100, color: "#00ff00", name: "XBOX", hit: 0 };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 10, 0.2)'; // Efeito de rastro
      ctx.fillRect(0, 0, width, height);

      // Partículas de fundo (Estilo Dashboard PS2)
      if (Math.random() < 0.3) {
        particles.push({ x: width, y: Math.random() * height, dx: -2, s: Math.random() * 2, c: "#fff" });
      }

      particles = particles.filter(p => {
        p.x += p.dx;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
        return p.x > 0;
      });

      [p1, p2].forEach((p, i) => {
        const floatY = p.y + Math.sin(Date.now() * 0.002 + i) * 20;
        
        // Brilho (Glow)
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.hit > 0 ? "#fff" : p.color;
        if (p.hit > 0) p.hit--;

        ctx.beginPath();
        ctx.arc(p.x, floatY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // UI Moderna
        ctx.fillStyle = "#fff";
        ctx.font = "8px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText(p.name, p.x, floatY - 25);
        ctx.fillStyle = "#333";
        ctx.fillRect(p.x - 20, floatY - 20, 40, 3);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 20, floatY - 20, (40 * p.health) / 100, 3);

        // Ataques de Raios
        if (Math.random() < 0.04) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, floatY);
          ctx.lineTo(i === 0 ? p2.x : p1.x, floatY + (Math.random() - 0.5) * 60);
          ctx.stroke();
          
          let target = i === 0 ? p2 : p1;
          target.health = Math.max(0, target.health - 2);
          target.hit = 3;
        }
      });

      if (p1.health <= 0 || p2.health <= 0) {
        setTimeout(() => { p1.health = 100; p2.health = 100; }, 1000);
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="duel-canvas-wrapper fluid-style">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default FluidDuelCanvas;