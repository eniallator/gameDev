(function() {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");
  var canvasDiv = document.getElementsByClassName("canvasContainer")[0];
  var smallCirclePosition = {
    x : -50,
    y : -50
  };

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
    state = BOUNCE_GAME.characterReducer(state);
    const playerPosition = state.playerCircle.position;
    updateScore();

    ctx.clearRect(screenDimensions.x,screenDimensions.y,screenDimensions.dx,screenDimensions.dy);
    ctx.beginPath();
    ctx.arc(playerPosition.x,playerPosition.y,state.playerCircle.radius,0,Math.PI*2,true);
    ctx.arc(smallCirclePosition.x,smallCirclePosition.y,10,0,Math.PI*2,true);
    ctx.fill();

    requestAnimationFrame(tick);
  }

  renderScore()
  resizeWindow()
  tick()

  function updateScore(){

    const xDiff = Math.abs(state.playerCircle.position.x - smallCirclePosition.x);
    const yDiff = Math.abs(state.playerCircle.position.y - smallCirclePosition.y);

    if (Math.sqrt((xDiff^2) + (yDiff^2)) - 10 - state.playerCircle.radius < 0){ // If to catch if the big circle has gotten the small circle
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
})();
