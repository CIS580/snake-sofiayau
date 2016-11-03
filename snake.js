/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
var speed = 3;
var score = 0;
var gameOver = false;
var appleEaten = false;
var snail = new Image();
snail.src = 'snail.svg';

console.log(snail.x, snail.y);
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var snakeSize = 20;
var oldTime = performance.now();
var gameOver = false;

var snake = [];
var length = 3;
var food = {x: Math.floor(Math.random()*30),
        y:Math.floor(Math.random()*20)};
for(var i = length; i >= 0; i--){
  snake.push({x:i, y:0});
 }
  //push 3 elements of array, x=0, y=index
var input = {
  up:false,
  down:false,
  left:false,
  right:false
}
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  if(gameOver == false){
    var elapsedTime = newTime - oldTime;
    oldTime = newTime;
    update(elapsedTime);
    render(elapsedTime);
    // Flip the back buffer
    frontCtx.drawImage(backBuffer, 0, 0);
    // Run the next loop
    window.requestAnimationFrame(loop);
  }
}
/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
 window.onkeydown = function(event){
  event.preventDefault();
   switch(event.keyCode){
 //up
   case 38:
   case 87:
     input.up = true;
     break;
     //left
   case 37:
   case 65:
     input.left = true;
     break;
     //right
   case 39:
   case 68:
     input.right = true;
     break;
     //down
   case 40:
   case 83:
     input.down = true;
     break;
   }
 return false;
 }
 window.onkeyup = function(event){
   event.preventDefault();
   switch(event.keyCode){
     //up
   case 38:
   case 87:
     input.up = false;
     break;
     //left
   case 37:
   case 65:
     input.left = false;
     break;
     //right
   case 39:
   case 68:
     input.right = false;
     break;
     //down
   case 40:
   case 83:
     input.down = false;
     break;
   }
   return true;
 }
function update(elapsedTime) {

  //draw the path of the snake
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;
//movement of snake
    if(input.up) snakeY -= 1;
    if(input.down) snakeY += 1;
    if(input.left)  snakeX -= 1;
    if(input.right)  snakeX += 1;
  // TODO: Spawn an apple periodically
  // TODO: Grow the snake periodically
  // TODO: Move the snake
  //spawn apples randomly
  var spawnApple = function(){
    food = {
      x: Math.floor((Math.random() * 30)+1),
      y: Math.floor((Math.random() * 20)+1)
    }
    //position of the snake
    for (var i=0; i<snake.lenth; i++){
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;
      if(food.x === snakeX && food.y === snakeY){
        food.x = Math.floor((Math.random() * 30)+1);
        food.y = Math.floor((Math.random() * 20)+1);
      }
    }
  }
  //check if there is a collision
  var checkCollision = function(x,y,array){
    for(var i =0;i<array.length; i++){
      if(array[i].x === x && array[i].y ===y)
      {
        return true;
      }
    }
    return false;
  }
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(snakeX <0 || snakeX > backBuffer.width / snakeSize || snakeY < 0 ||snakeY > backBuffer.height/snakeSize || checkCollision(snakeX,snakeY,snake)){
    console.log(snakeX,snakeY);
    //document.getElementById("snake").innerHTML = "changed!";
    if(snakeX == -1 || snakeX == 760/20 || snakeY == -1 || snakeY == 480/20) {
      gameOver = true;
      console.log('go');
    }
 return;
  }
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  if (snakeX == food.x && snakeY == food.y){
    var tail = {
      x:snakeX,
      y:snakeY
    };
    score += 10;
    appleEaten = true;
    snake[snake.length] = {x: snake[snake.length-1].x, y: snake[snake.length-1].y};
    spawnApple();
  }else{
    var tail = snake.pop();
    tail.x = snakeX;
    tail.y = snakeY;
    snake.unshift(tail);
  }
  if(snakeX == 220 && snakeY == 200){
    console.log(snail.x, snail.y);
    gameOver = true;
  }
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle
}
/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  // TODO: Draw the game objects into the backBuffer
  backCtx.fillStyle = "lightblue";
  backCtx.fillRect(0,0,backBuffer.width,backBuffer.height);
  var snakeBody = function(x,y){
    backCtx.fillStyle = "lightgreen";
    backCtx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    //console.log(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
   }
   var apple = function(x,y){
     backCtx.fillStyle = "red";
     backCtx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
   }
   var scoreText = function(){
     var score_text = "score: " + score;
     backCtx.fillStyle = "blue";
     backCtx.fillText(score_text, 20, 20);//counting scores
   }
   //body of the snake
   for(var i =0; i<snake.length; i++){
     snakeBody(snake[i].x,snake[i].y);

   }
   console.log(food.x, food.y);
   backCtx.drawImage(snail, 220,
           200,
             40, 40);
   apple(food.x, food.y);
   //snakeBody(20, 20);
   //apple(20,20);
   scoreText();
   if(gameOver){
     backCtx.fillStyle = 'Black';
     backCtx.fillText("Game Over! Please Try Again", backBuffer.width/2 - 220, backBuffer.height/2);
   }
}
  //ctx.drawImage(backCanvas,0,0);
/* Launch the game */
window.requestAnimationFrame(loop);
