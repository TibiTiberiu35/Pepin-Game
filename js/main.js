const Player = function(x, y) {
  this.x = x;
  this.y = y;
};

var scaled_size = 32;
var sprite_size = 16;
var columns = 24;
var rows = 24;
var map = [0, 0, 0];

var context = document.querySelector("canvas").getContext("2d");
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var player = new Player(100, 100);

function loop() {
  window.requestAnimationFrame(loop);
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  context.canvas.height = height;
  context.canvas.width = width;

  context.fillStyle = "#007000";
  context.fillRect(0, 0, width, height);

  context.imageSmoothingEnabled = false;
  context.drawImage(tile_sheet, 180, 180, 20, 20, player.x, player.y, 64, 64);
}

var tile_sheet = new Image();
tile_sheet.addEventListener("load", () => {
  loop();
});
tile_sheet.src = "../img/dungeon_tiles.png";
