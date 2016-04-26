(function() {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");
  var smallCirclePosition = {
    x : -50,
    y : -50
  };
  var keysPressed = {
    w : false,
    a : false,
    s : false,
    d : false
  };
  var onGround = false;
  var canvasDiv = document.getElementsByClassName("canvasContainer")[0];
  var screenDimensions = {
    x : 0,
    y : 0,
    dx : canvasDiv.offsetWidth,
    dy : canvasDiv.offsetHeight
  };
  var score = 0;

  function resizeWindow(){
    canvas.width = canvasDiv.offsetWidth;
    canvas.height = canvasDiv.offsetHeight;
  }

  function updateScore(){
    var outputScore = document.getElementById("outputScore");
    outputScore.value = score;
  }

  function tick(){
    updatePosition()

    ctx.clearRect(screenDimensions.x,screenDimensions.y,screenDimensions.dx,screenDimensions.dy);
    ctx.beginPath();
    ctx.arc(circlePosition.x,circlePosition.y,circleRadius,0,Math.PI*2,true);
    ctx.arc(smallCirclePosition.x,smallCirclePosition.y,10,0,Math.PI*2,true);
    ctx.fill();

    requestAnimationFrame(tick);
  }

  updateScore()
  resizeWindow()
  tick()

  function updatePosition(){

    if(keysPressed.w && onGround){
      circleVelocity.y = jumpPower;
    }

    if(keysPressed.d){
      circleVelocity.x += movementSpeed;
    }

    if(keysPressed.a){
      circleVelocity.x -= movementSpeed;
    }

    circleVelocity.x *= drag;
    circleVelocity.y *= drag;
    circleVelocity.y += gravity;

    if (circleVelocity.x > 0 && circlePosition.x + circleVelocity.x < (screenDimensions.dx - circleRadius)) {
      circlePosition.x += circleVelocity.x;
    } else if (circlePosition.x + circleVelocity.x > (screenDimensions.dx - circleRadius)) {
      circleVelocity.x = -1 * circleVelocity.x;
    }

    if (circleVelocity.x < 0 && circlePosition.x + circleVelocity.x > (screenDimensions.x + circleRadius)) {
      circlePosition.x += circleVelocity.x;
    } else if (circlePosition.x + circleVelocity.x < (screenDimensions.x + circleRadius)) {
      circleVelocity.x = -1 * circleVelocity.x;
    }

    if (circleVelocity.y > 0 && circlePosition.y + circleVelocity.y < (screenDimensions.dy - circleRadius)) {
      circlePosition.y += circleVelocity.y;
    } else if (circlePosition.y + circleVelocity.y > (screenDimensions.dy - circleRadius)) {
      circleVelocity.y = -1 * circleVelocity.y;
    }

    if (circlePosition.y + circleVelocity.y > (screenDimensions.y + circleRadius)) {
      circlePosition.y += circleVelocity.y;
    } else {
      circleVelocity.y = -1 * circleVelocity.y;
    }

    if (circlePosition.y > (screenDimensions.dy - circleRadius - 1)) {
      onGround = true;
    } else {
      onGround = false;
    }

    if (false){ // If to catch if the big circle has gotten the small circle
      score += 1;

      smallCirclePosition = {
        x : -50,
        y : -50
      };

      updateScore();
    }
  }

  window.addEventListener("keydown",function(event){
    switch (event.code) {
      case "KeyS":

        keysPressed.s = true;
        break;
      case "KeyW":

        keysPressed.w = true;
        break;
      case "KeyD":

        keysPressed.d = true;
        break;
      case "KeyA":

        keysPressed.a = true;
    }
  });

  window.addEventListener("keyup",function(event){
    switch (event.code) {
      case "KeyS":

        keysPressed.s = false;
        break;
      case "KeyW":

        keysPressed.w = false;
        break;
      case "KeyD":

        keysPressed.d = false;
        break;
      case "KeyA":

        keysPressed.a = false;
    }
  });

  window.addEventListener("click",function(event){
    smallCirclePosition.x = event.clientX - 10
    smallCirclePosition.y = event.clientY - 25
  });
})();
