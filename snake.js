/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
var speed = 1/16/1000;
var score = 0;
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var apple;
var snake = [];
var snakeSize = 10;
var oldTime = performance.now();
var x = 0;
var y =0;

/*function init(){
drawSnake();
spawnApple();
setInterval(loop,80);
}*/


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
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;

  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);
  // Run the next loop
  window.requestAnimationFrame(loop);
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
 function gameOver(){
   //the warning of game over
   frontCtx.fillRect(0,0,frontBuffer.width,frontBuffer.height);
   frontCtx.fillStyle = "red";
   frontCtx.fillText("game over");
   frontCtx.fillText("score"+scoreText()+frontBuffer.width,frontBuffer.height);
 }

function update(elapsedTime) {
  //draw the path of the snake
  backCtx.fillStyle = "purple";
  backCtx.fillRect(0,0,backCtx.width,backCtx.height);
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
    apple = {
      x: Math.floor((Math.random() * 30)+1),
      y: Math.floor((Math.random() * 30)+1)
    }
    //position of the snake
    for (var i=0; i<snake.lenth; i++){
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if(apple.x === snakeX ||apple.y === snakeY && apple.x === snakeX){
        apple.x = Math.floor((Math.random() * 30)+1);
        apple.y = Math.floor((Math.random() * 30)+1);
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
  if(snakeX == -1 || snakeX == backCtx.width / snakeSize || snakeY == -1 ||snakeY == backCtx.height/snakeSize || checkCollision(snakeX,snakeY,snake)){
    backCtx.clearRect(0,0,backCtx.width, backCtx.height);
    gameOver();
    return;
  }
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  if (snakeX == apple.x && snakeY == apple.y){
    var tail = {
      x:snakeX,
      y:snakeY
    };
    score++;
    spawnApple();
  }else{
    var tail = snake.pop();
    tail.x = snakeX;
    tail.y = snakeY;
  }
  snake.unshift(tail);
  for(var i =0; i<snake.length; i++){
    snakeBody(snake[i].x,snake[i].y);
  }
  food(apple.x, apple.y);
  scoreText();
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
    backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
    var snakeBody = function(x,y){
    backCtx.fillStyle = "green";
    backCtx.rect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
     }
   var food = function(x,y){
     backCtx.fillStyle = "red";
     backCtx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
   }
   var scoreText = function(){
     var score_text = "score" + score;
     backCtx.fillStyle = "blue";
     backCtx.fillText(score_text,145,20);//counting scores
   }

   //body of the snake
   var drawSnake = function(){
     var length = 2;
     //push 3 elements of array, x=0, y=index
     for(var i =lenth; i >= 0; i--){
       snake.push({x:i, y:0});
     }
   }

}


  //ctx.drawImage(backCanvas,0,0);
/* Launch the game */
window.requestAnimationFrame(loop);
