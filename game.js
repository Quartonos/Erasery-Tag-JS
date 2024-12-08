document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = 800;
    canvas.height = 600;
  
    const keys = {};
    document.addEventListener("keydown", (e) => keys[e.key] = true);
    document.addEventListener("keyup", (e) => keys[e.key] = false);
  
    let player = {
      x: 100,
      y: 100,
      width: 30,
      height: 30,
      dx: 0,
      dy: 0,
      speed: 5,
      jumpPower: 12,
      gravity: 0.6,
      grounded: false
    };
  
    let platforms = [
      { x: 0, y: 570, width: 800, height: 30 },
      { x: 200, y: 450, width: 150, height: 20 },
      { x: 400, y: 350, width: 200, height: 20 },
      { x: 650, y: 250, width: 100, height: 20 }
    ];
  
    function isColliding(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }
  
    function handlePlayerMovement() {
      player.dy += player.gravity; // Gravità
      player.grounded = false; // Resetta lo stato di "a terra"
  
      // Gestione collisioni con le piattaforme
      for (let platform of platforms) {
        if (isColliding(player, platform)) {
          if (player.dy > 0 && player.y + player.height <= platform.y + platform.height) {
            player.grounded = true;
            player.dy = 0;
            player.y = platform.y - player.height; // Posiziona il giocatore sopra la piattaforma
          }
        }
      }
  
      // Movimento laterale
      if (keys["ArrowLeft"]) player.dx = -player.speed;
      else if (keys["ArrowRight"]) player.dx = player.speed;
      else player.dx = 0;
  
      // Salto
      if (keys["ArrowUp"] && player.grounded) {
        player.dy = -player.jumpPower;
        player.grounded = false;
      }
  
      // Applica il movimento
      player.x += player.dx;
      player.y += player.dy;
  
      // Controlli dei limiti dello schermo
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    }
  
    function drawPlayer() {
      ctx.fillStyle = "blue";
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }
  
    function drawPlatforms() {
      ctx.fillStyle = "green";
      for (let platform of platforms) {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      }
    }
  
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPlatforms();
      handlePlayerMovement();
      drawPlayer();
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop();
  });
  