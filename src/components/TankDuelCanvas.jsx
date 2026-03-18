import React, { useRef, useEffect } from 'react';

const TankDuelCanvas = ({ color1 = "#8b4513", color2 = "#00aaff" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 150;

    let tank1 = { x: 80, y: height/2, angle: 0, color: color1, health: 100, name: "ATARI 2600" };
    let tank2 = { x: width - 80, y: height/2, angle: Math.PI, color: color2, health: 100, name: "INTELLIVISION" };
    let bullets = [];

    const drawTank = (tank) => {
      ctx.save();
      ctx.translate(tank.x, tank.y);
      
      // NOME DO CONSOLE
      ctx.fillStyle = "#fff";
      ctx.font = "8px 'Press Start 2P'";
      ctx.textAlign = "center";
      ctx.fillText(tank.name, 0, -25);

      // BARRA DE VIDA
      ctx.fillStyle = "#333";
      ctx.fillRect(-15, -20, 30, 4);
      ctx.fillStyle = tank.color;
      ctx.fillRect(-15, -20, (30 * tank.health) / 100, 4);

      ctx.rotate(tank.angle);
      // Corpo do Tanque
      ctx.fillStyle = tank.color;
      ctx.fillRect(-12, -10, 24, 20); 
      ctx.fillRect(2, -4, 14, 8);    
      // Lagartas
      ctx.fillStyle = "#000";
      ctx.fillRect(-12, -12, 24, 4);
      ctx.fillRect(-12, 8, 24, 4);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Movimentação
      tank1.y = (height/2) + Math.sin(Date.now() * 0.002) * 35;
      tank2.y = (height/2) + Math.cos(Date.now() * 0.002) * 35;

      // Atirar
      if (Math.random() < 0.03 && tank1.health > 0) {
        bullets.push({ x: tank1.x + 15, y: tank1.y, dx: 4, color: tank1.color, owner: 1 });
      }
      if (Math.random() < 0.03 && tank2.health > 0) {
        bullets.push({ x: tank2.x - 15, y: tank2.y, dx: -4, color: tank2.color, owner: 2 });
      }

      bullets = bullets.filter(b => {
        b.x += b.dx;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y - 2, 5, 5); 

        if (b.owner === 1 && b.x > tank2.x - 12 && b.x < tank2.x + 12 && b.y > tank2.y - 10 && b.y < tank2.y + 10) {
          tank2.health = Math.max(0, tank2.health - 10);
          return false;
        }
        if (b.owner === 2 && b.x < tank1.x + 12 && b.x > tank1.x - 12 && b.y > tank1.y - 10 && b.y < tank1.y + 10) {
          tank1.health = Math.max(0, tank1.health - 10);
          return false;
        }
        return b.x > 0 && b.x < width;
      });

      if (tank1.health <= 0 || tank2.health <= 0) {
        setTimeout(() => { tank1.health = 100; tank2.health = 100; }, 1500);
      }

      if (tank1.health > 0) drawTank(tank1);
      if (tank2.health > 0) drawTank(tank2);
      requestAnimationFrame(animate);
    };
    animate();
  }, [color1, color2]);

  return (
    <div className="duel-canvas-wrapper tank-style">
      <canvas ref={canvasRef} className="retro-duel-canvas" />
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default TankDuelCanvas;