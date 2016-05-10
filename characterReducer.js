const initialState = {
  position : {
    x : 200,
    y : 350
  },
  velocity : {
    x : 0,
    y : 0
  },
  radius : 50,
  onGround : false
};

var movementSpeed = 0.2;
var jumpPower = -20;
var gravity = 0.09;
var drag = 0.97;

module.exports = function(state) {
  if(state.playerCircle === undefined) {
      state.playerCircle = initialState;
      return state;
  }

  if(state.keysPressed.w && state.playerCircle.onGround){
    state.playerCircle.velocity.y = jumpPower;
  }

  if(state.keysPressed.d){
    state.playerCircle.velocity.x += movementSpeed;
  }

  if(state.keysPressed.a){
    state.playerCircle.velocity.x -= movementSpeed;
  }

  state.playerCircle.velocity.x *= drag;
  state.playerCircle.velocity.y *= drag;
  state.playerCircle.velocity.y += gravity;

  if (state.playerCircle.velocity.x > 0 && state.playerCircle.position.x + state.playerCircle.velocity.x < (state.environment.screenDimensions.dx - state.playerCircle.radius)) {
    state.playerCircle.position.x += state.playerCircle.velocity.x;
  } else if (state.playerCircle.position.x + state.playerCircle.velocity.x > (state.environment.screenDimensions.dx - state.playerCircle.radius)) {
    state.playerCircle.velocity.x = -1 * state.playerCircle.velocity.x;
  }

  if (state.playerCircle.velocity.x < 0 && state.playerCircle.position.x + state.playerCircle.velocity.x > (state.environment.screenDimensions.x + state.playerCircle.radius)) {
    state.playerCircle.position.x += state.playerCircle.velocity.x;
  } else if (state.playerCircle.position.x + state.playerCircle.velocity.x < (state.environment.screenDimensions.x + state.playerCircle.radius)) {
    state.playerCircle.velocity.x = -1 * state.playerCircle.velocity.x;
  }

  if (state.playerCircle.velocity.y > 0 && state.playerCircle.position.y + state.playerCircle.velocity.y < (state.environment.screenDimensions.dy - state.playerCircle.radius)) {
    state.playerCircle.position.y += state.playerCircle.velocity.y;
  } else if (state.playerCircle.position.y + state.playerCircle.velocity.y > (state.environment.screenDimensions.dy - state.playerCircle.radius)) {
    state.playerCircle.velocity.y = -1 * state.playerCircle.velocity.y;
  }

  if (state.playerCircle.position.y + state.playerCircle.velocity.y > (state.environment.screenDimensions.y + state.playerCircle.radius)) {
    state.playerCircle.position.y += state.playerCircle.velocity.y;
  } else {
    state.playerCircle.velocity.y = -1 * state.playerCircle.velocity.y;
  }

  if (state.playerCircle.position.y > (state.environment.screenDimensions.dy - state.playerCircle.radius - 1)) {
    state.playerCircle.onGround = true;
  } else {
    state.playerCircle.onGround = false;
  }

  return state;
};
