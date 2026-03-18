import React, { useRef, useEffect } from 'react';

const PolyDuelCanvas = ({ color1 = "#00d1ff", color2 = "#666" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    let angle = 0;
    let p1 = { x: 150, y: 75, health: 100, name: "PLAYSTATION", color: color1, hit: 0 };
    let p2 = { x: 450, y: 75, health: 100, name: "SATURN", color: color2, hit: 0 };
    let shards = [];

    const drawWireframeCube = (x, y, size, rot, color, hit) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = hit > 0 ? "#fff" : color;
      ctx.lineWidth = 2;
      ctx.strokeRect(-size/2, -size/2, size, size);
      ctx.strokeRect(-size/4, -size/4, size, size);
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2); ctx.lineTo(-size/4, -size/4);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.05;

      // Grid de fundo 3D
      ctx.strokeStyle = "#1a1a1a";
      for(let i=0; i<width; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }

      // Lógica de Tiros (Triângulos)
      if (Math.random() < 0.03 && p1.health > 0 && p2.health > 0) {
        shards.push({ x: p1.x, y: p1.y, dx: 5, color: p1.color, owner: 1 });
        shards.push({ x: p2.x, y: p2.y, dx: -5, color: p2.color, owner: 2 });
      }

      shards = shards.filter(s => {
        s.x += s.dx;
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - 5); ctx.lineTo(s.x + 5, s.y + 5); ctx.lineTo(s.x - 5, s.y + 5);
        ctx.closePath(); ctx.stroke();

        let target = s.owner === 1 ? p2 : p1;
        if (Math.abs(s.x - target.x) < 20 && Math.abs(s.y - target.y) < 30) {
          target.health -= 5;
          target.hit = 5;
          return false;
        }
        return s.x > 0 && s.x < width;
      });

      [p1, p2].forEach((p, i) => {
        const curY = p.y + Math.sin(angle + i) * 20;
        if (p.hit > 0) p.hit--;
        drawWireframeCube(p.x, curY, 30, angle * (i === 0 ? 1 : -1), p.color, p.hit);

        // UI
        ctx.fillStyle = "#fff";
        ctx.font = "8px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText(p.name, p.x, curY - 35);
        ctx.fillStyle = "#222";
        ctx.fillRect(p.x - 25, curY - 25, 50, 4);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 25, curY - 25, (50 * p.health) / 100, 4);
      });

      if(p1.health <= 0 || p2.health <= 0) {
        setTimeout(() => { p1.health = 100; p2.health = 100; }, 1000);
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [color1, color2]);

  return (
    <div className="duel-canvas-wrapper poly-style">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default PolyDuelCanvas;