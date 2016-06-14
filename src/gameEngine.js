var characterReducer = require('./characterReducer');

var canvas = document.getElementById("gameWorld");
var ctx = canvas.getContext("2d");
var canvasDiv = document.getElementsByClassName("canvasContainer")[0];
var smallCirclePosition = {
  x : -50,
  y : -50
};

const characterImage = new Image();
characterImage.src = "../assets/character_image.png"

let state = {
  keysPressed : {
    w : false,
    a : false,
    d : false
  },
  environment : {
    screenDimensions : {
      x : 0,
      y : 0,
      dx : canvasDiv.offsetWidth,
      dy : canvasDiv.offsetHeight
    }
  }
};

var score = 0;

function init(){

  renderScore()
  resizeWindow()
  tick()
}

function resizeWindow(){
  canvas.width = canvasDiv.offsetWidth;
  canvas.height = canvasDiv.offsetHeight;
}

function renderScore(){
  var outputScore = document.getElementById("outputScore");
  outputScore.value = score;
}

function tick(){
  const screenDimensions = state.environment.screenDimensions;
  state = characterReducer(state);
  const playerPosition = state.playerCircle.position;
  const playerRadius = state.playerCircle.radius;

  updateScore();

  ctx.clearRect(screenDimensions.x,screenDimensions.y,screenDimensions.dx,screenDimensions.dy);
  ctx.beginPath();
  ctx.drawImage(characterImage,playerPosition.x-playerRadius,playerPosition.y-playerRadius,playerRadius*2,playerRadius*2);
  ctx.arc(smallCirclePosition.x,smallCirclePosition.y,10,0,Math.PI*2,true);
  ctx.fill();

  requestAnimationFrame(tick);
}

function updateScore(){

  const xDiff = Math.abs(state.playerCircle.position.x - smallCirclePosition.x);
  const yDiff = Math.abs(state.playerCircle.position.y - smallCirclePosition.y);

  debugger;

  if (Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2)) - 10 - state.playerCircle.radius < 0){ // If to catch if the big circle has gotten the small circle
    score += 1;

    smallCirclePosition = {
      x : -50,
      y : -50
    };

    renderScore();
  }
}

window.addEventListener("keydown",function(event){
  switch (event.code) {
    case "KeyW":

      state.keysPressed.w = true;
      break;
    case "KeyD":

      state.keysPressed.d = true;
      break;
    case "KeyA":

      state.keysPressed.a = true;
  }
});

window.addEventListener("keyup",function(event){
  switch (event.code) {
    case "KeyW":

      state.keysPressed.w = false;
      break;
    case "KeyD":

      state.keysPressed.d = false;
      break;
    case "KeyA":

      state.keysPressed.a = false;
  }
});

window.addEventListener("click",function(event){
  smallCirclePosition.x = event.clientX - 10
  smallCirclePosition.y = event.clientY - 25
});

characterImage.onload = function (){
  init()
}
