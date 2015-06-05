function Game() { };

Game.prototype.handleNetwork = function(socket) {
  console.log('Game connection process here');
  console.log(socket);
  // This is where you receive all socket messages
}

Game.prototype.handleLogic = function() {
  console.log('Game is running');
  // This is where you update your game logic
}

Game.prototype.handleGraphics = function(gfx) {
  // This is where you draw everything
  gfx.fillStyle = '#fbfcfc';
  gfx.fillRect(0, 0, screenWidth, screenHeight);

  gfx.fillStyle = '#2ecc71';
  gfx.strokeStyle = '#27ae60';
  gfx.font = 'bold 50px Verdana';
  gfx.textAlign = 'center';
  gfx.lineWidth = 2;
  gfx.fillText('Now playing...', screenWidth / 2, screenHeight / 2);
  gfx.strokeText('Now playing...', screenWidth / 2, screenHeight / 2);
}
