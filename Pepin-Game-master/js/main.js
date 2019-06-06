
const Player = function(x, y) {
  this.x = 2;
  this.y = 2;
};

Player.prototype = {

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
var sprite_size_money = 18;
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

  var x_min = Math.floor(viewport.x / scaled_size);
  var y_min = Math.floor(viewport.y / scaled_size);
  var x_max = Math.ceil((viewport.x + viewport.w) / scaled_size);
  var y_max = Math.ceil((viewport.y + viewport.h) / scaled_size);

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
  // context.drawImage(tile_sheet, 64, 0, sprite_size, sprite_size, Math.round(player.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(player.y - viewport.y + height * 0.5 - viewport.h * 0.5), scaled_size, scaled_size);
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