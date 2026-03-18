import React, { useRef, useEffect } from 'react';

const PlatformDuelCanvas = ({ color1 = "#ff0000", color2 = "#0000ff" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    let p1 = { x: 100, y: height - 40, w: 20, h: 30, color: color1, dy: 0, jumping: false, health: 100, name: "NES" };
    let p2 = { x: width - 120, y: height - 40, w: 20, h: 30, color: color2, dy: 0, jumping: false, health: 100, name: "MASTER" };
    let bullets = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#333";
      ctx.fillRect(0, height - 10, width, 10);

      [p1, p2].forEach((p, index) => {
        if (!p.jumping && Math.random() < 0.02) {
          p.dy = -8;
          p.jumping = true;
        }
        
        if (Math.random() < 0.02 && p.health > 0) {
          bullets.push({ x: p.x + (index === 0 ? 20 : -5), y: p.y + 15, dx: index === 0 ? 6 : -6, color: p.color, owner: index });
        }

        p.y += p.dy;
        p.dy += 0.4; 

        if (p.y > height - 40) {
          p.y = height - 40;
          p.dy = 0;
          p.jumping = false;
        }

        if (p.health > 0) {
          // Nome e Vida
          ctx.fillStyle = "#fff";
          ctx.font = "8px 'Press Start 2P'";
          ctx.textAlign = "center";
          ctx.fillText(p.name, p.x + p.w/2, p.y - 15);
          
          ctx.fillStyle = "#555";
          ctx.fillRect(p.x, p.y - 8, p.w, 3);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y - 8, (p.w * p.health) / 100, 3);

          // Sprite
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = "#fff";
          ctx.fillRect(p.x + (index === 0 ? 12 : 4), p.y + 6, 4, 4);
        }
      });

      bullets = bullets.filter(b => {
        b.x += b.dx;
        ctx.fillStyle = "#fff";
        ctx.fillRect(b.x, b.y, 6, 4);

        let target = b.owner === 0 ? p2 : p1;
        if (b.x > target.x && b.x < target.x + target.w && b.y > target.y && b.y < target.y + target.h) {
          target.health = Math.max(0, target.health - 10);
          return false;
        }
        return b.x > 0 && b.x < width;
      });

      if (p1.health <= 0 || p2.health <= 0) {
        setTimeout(() => { p1.health = 100; p2.health = 100; }, 1500);
      }

      requestAnimationFrame(animate);
    };
    animate();
  }, [color1, color2]);

  return (
    <div className="duel-canvas-wrapper platform-style">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default PlatformDuelCanvas;