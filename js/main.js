
const Player = function(x, y) {
  this.x = 2;
  this.y = 2;
};

const Enemy = function(x, y) {
  this.x = 2;
  this.y = 2;
};

Player.prototype = {

  moveTo:function(x,y) {
    this.x = x;
    this.y = y;
  }

};

Enemy.prototype = {

  moveTo:function(x,y) {
    this.x = x;
    this.y = y;
  }

};

const Viewport = function(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w; 
  this.h = h;
};

Viewport.prototype = {
  scrollTo:function(x,y) {
    this.x = x - this.w / 2;
    this.y = y - this.h / 2;
  }
};

// Variables for the map
var wall;
var scaled_size = 64;
var sprite_size = 16;
var sprite_size_money = 20;
var columns = 30;
var rows = 38;

var map = [418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 75, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 75, 120, 120, 120, 120, 418,
  418, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 121, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 75, 120, 121, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 75, 120, 120, 120, 120, 120, 120, 121, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 418,
  418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418, 418,
  
  
  ];

var context = document.querySelector("canvas").getContext("2d");
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var pointer = { x:200, y:200};
var enemySpeed = { x1:-1, y1:1, x2:1, y2:-1, x3:1, y3:1, x4:-2, y4:2, x5:2, y5:2, x6:2, y6:-2, x7:-3, y7:3, x8:3, y8:3, x9:3, y9:-3};
var enemy1 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy2 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy3 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy4 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy5 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy6 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy7 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy8 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var enemy9 = { x:Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
var player = new Player(pointer.x, pointer.y);
var viewport = new Viewport( 0, 0, width, height);

// Create map
function loop() {
  window.requestAnimationFrame(loop);

  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  context.canvas.height = height;
  context.canvas.width = width;

  context.imageSmoothingEnabled = false;

  player.moveTo(pointer.x, pointer.y);
  viewport.scrollTo(player.x,player.y);

  for (let x = 0; x < 30; x++) {
    for (let y = 0; y < 38; y++) {
      let value = map[y * columns + x];
      let tile_x = Math.floor(x * scaled_size - viewport.x + width / 2 - viewport.w / 2);
      let tile_y = Math.floor(y * scaled_size - viewport.y + height / 2 - viewport.h / 2);
      
      switch (value) {
        case 120:
          context.drawImage(
            tile_sheet,
            38,
            38,
            sprite_size,
            sprite_size,
            tile_x,
            tile_y,
            scaled_size,
            scaled_size
          );
          break;
        case 75:
          context.drawImage(
            tile_sheet,
            80,
            43,
            sprite_size,
            sprite_size,
            tile_x,
            tile_y,
            scaled_size,
            scaled_size
          );
          break;
        case 418:
          case 417:
          context.drawImage(tile_sheet,32,288,sprite_size,sprite_size,tile_x,tile_y,scaled_size,scaled_size);
          break;
        default:
          
          context.drawImage(tile_sheet, 90, 205, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size);
          break;
          case 121:
              
                context.drawImage(
                  money_sheet,
                  70,
                  42,
                  sprite_size_money,
                  sprite_size_money,
                  tile_x,
                  tile_y,
                  scaled_size,
                  scaled_size,
                )
              
      }
      // if(x == 4 && y == 2) {
      //   context.drawImage(
      //     money_sheet,
      //     70,
      //    42,
      //     sprite_size_money,
      //     sprite_size_money,
      //     tile_x,
      //     tile_y,
          
      //   )
      // }
      context.drawImage(
        tile_sheet,
        value * sprite_size,
        0,
        sprite_size,
        sprite_size,
        tile_x,
        tile_y,
        scaled_size,
        scaled_size
      );
    }
  }

  
  context.drawImage(tile_sheet, 180, 180, 20, 20, Math.round(player.x - viewport.x + width / 2 - viewport.w / 2 - scaled_size / 2), Math.round(player.y - viewport.y + height / 2 - viewport.h / 2 - scaled_size / 2), scaled_size, scaled_size);


  context.drawImage(tile_sheet, 204, 180, 20, 20, Math.round(enemy1.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy1.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 204, 180, 20, 20, Math.round(enemy2.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy2.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 204, 180, 20, 20, Math.round(enemy3.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy3.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 195, 160, 20, 20, Math.round(enemy4.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy4.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 195, 160, 20, 20, Math.round(enemy5.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy5.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 195, 160, 20, 20, Math.round(enemy6.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy6.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 217, 160, 20, 20, Math.round(enemy7.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy7.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 217, 160, 20, 20, Math.round(enemy8.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy8.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
  context.drawImage(tile_sheet, 217, 160, 20, 20, Math.round(enemy9.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(enemy9.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);

  enemy1.x += enemySpeed.x1;
  enemy1.y += enemySpeed.y1;
  if(enemy1.x <= scaled_size){
    enemySpeed.x1 = 1 * 1.2;
  }else if(enemy1.x >= scaled_size * 29 - 40){
    enemySpeed.x1 = -1 * 1.2;
  }
  if(enemy1.y <= scaled_size){
    enemySpeed.y1 = 1 * 1.2;
  }else if(enemy1.y >= scaled_size * 37 - 30){
    enemySpeed.y1 = -1 * 1.2;
  }

  enemy2.x += enemySpeed.x2;
  enemy2.y += enemySpeed.y2;
  if(enemy2.x <= scaled_size){
    enemySpeed.x2 = 1 * 1.2;
  }else if(enemy2.x >= scaled_size * 29 - 40){
    enemySpeed.x2 = -1 * 1.2;
  }
  if(enemy2.y <= scaled_size){
    enemySpeed.y2 = 1 * 1.2;
  }else if(enemy2.y >= scaled_size * 37 - 30){
    enemySpeed.y2 = -1 * 1.2;
  }

  enemy3.x += enemySpeed.x3;
  enemy3.y += enemySpeed.y3;
  if(enemy3.x <= scaled_size){
    enemySpeed.x3 = 1 * 1.2;
  }else if(enemy3.x >= scaled_size * 29 - 40){
    enemySpeed.x3 = -1 * 1.2;
  }
  if(enemy3.y <= scaled_size){
    enemySpeed.y3 = 1 * 1.2;
  }else if(enemy3.y >= scaled_size * 37 - 30){
    enemySpeed.y3 = -1 * 1.2;
  }

  enemy4.x += enemySpeed.x4;
  enemy4.y += enemySpeed.y4;
  if(enemy4.x <= scaled_size){
    enemySpeed.x4 = 2 * 1.1;
  }else if(enemy4.x >= scaled_size * 29 - 40){
    enemySpeed.x4 = -2 * 1.1;
  }
  if(enemy4.y <= scaled_size){
    enemySpeed.y4 = 2 * 1.1;
  }else if(enemy4.y >= scaled_size * 37 - 30){
    enemySpeed.y4 = -2 * 1.1;
  }

  enemy5.x += enemySpeed.x5;
  enemy5.y += enemySpeed.y5;
  if(enemy5.x <= scaled_size){
    enemySpeed.x5 = 2 * 1.1;
  }else if(enemy5.x >= scaled_size * 29 - 40){
    enemySpeed.x5 = -2 * 1.1;
  }
  if(enemy5.y <= scaled_size){
    enemySpeed.y5 = 2 * 1.1;
  }else if(enemy5.y >= scaled_size * 37 - 30){
    enemySpeed.y5 = -2 * 1.1;
  }

  enemy6.x += enemySpeed.x6;
  enemy6.y += enemySpeed.y6;
  if(enemy6.x <= scaled_size){
    enemySpeed.x6 = 2 * 1.1;
  }else if(enemy6.x >= scaled_size * 29 - 40){
    enemySpeed.x6 = -2 * 1.1;
  }
  if(enemy6.y <= scaled_size){
    enemySpeed.y6 = 2 * 1.1;
  }else if(enemy6.y >= scaled_size * 37 - 30){
    enemySpeed.y6 = -2 * 1.1;
  }

  enemy7.x += enemySpeed.x7;
  enemy7.y += enemySpeed.y7;
  if(enemy7.x <= scaled_size){
    enemySpeed.x7 = 3;
  }else if(enemy7.x >= scaled_size * 29 - 40){
    enemySpeed.x7 = -3;
  }
  if(enemy7.y <= scaled_size){
    enemySpeed.y7 = 3;
  }else if(enemy7.y >= scaled_size * 37 - 30){
    enemySpeed.y7 = -3;
  }

  enemy8.x += enemySpeed.x8;
  enemy8.y += enemySpeed.y8;
  if(enemy8.x <= scaled_size){
    enemySpeed.x8 = 3;
  }else if(enemy8.x >= scaled_size * 29 - 40){
    enemySpeed.x8 = -3;
  }
  if(enemy8.y <= scaled_size){
    enemySpeed.y8 = 3;
  }else if(enemy8.y >= scaled_size * 37 - 30){
    enemySpeed.y8 = -3;
  }

  enemy9.x += enemySpeed.x9;
  enemy9.y += enemySpeed.y9;
  if(enemy9.x <= scaled_size){
    enemySpeed.x9 = 3;
  }else if(enemy9.x >= scaled_size * 29 - 40){
    enemySpeed.x9 = -3;
  }
  if(enemy9.y <= scaled_size){
    enemySpeed.y9 = 3;
  }else if(enemy9.y >= scaled_size * 37 - 30){
    enemySpeed.y9 = -3;
  }
}

var tile_sheet = new Image();
tile_sheet.addEventListener("load", () => {
  loop();
});
tile_sheet.src = "../img/dungeon_tiles.png";

var money_sheet = new Image();
money_sheet.addEventListener("load", () => {
  loop();
});
money_sheet.src = "../img/bani.png";


document.addEventListener("keydown",(e)=>{
  if (e.keyCode === 37 || e.keyCode === 65) {
    if(player.x > scaled_size + 35)
      pointer.x -= 10;
  }else if (e.keyCode === 38 || e.keyCode === 87) {
    if(player.y > scaled_size - 10)
      pointer.y -= 10;
  }else if (e.keyCode === 39 || e.keyCode === 68) {
    if(player.x < scaled_size * 29 - 40)
      pointer.x += 10;
  }else if (e.keyCode === 40 || e.keyCode === 83) {
    if(player.y < scaled_size * 37 - 30)
      pointer.y += 10;
  } 
});
