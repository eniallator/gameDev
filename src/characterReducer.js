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

const movementSpeed = 0.2;
const jumpPower = -10;
const gravity = 0.09;
const drag = 0.97;

module.exports = function(state) {
  if(state.playerCircle === undefined) {
      return {
        playerCircle: initialState,
        ...state
      };
  }

  const {
     keysPressed,
     environment: {
       screenDimensions
     },
     playerCircle
  } = state;

  const {
    position,
    velocity,
    radius,
    onGround
  } = playerCircle;

  if(keysPressed.w && onGround){
    velocity.y = jumpPower;
  }
  if(keysPressed.d){
    velocity.x += movementSpeed;
  }
  if(keysPressed.a){
    velocity.x -= movementSpeed;
  }

  velocity.x *= drag;
  velocity.y *= drag;
  velocity.y += gravity;

  if (velocity.x > 0 && position.x + velocity.x < (screenDimensions.dx - radius)) {
    position.x += velocity.x;
  } else if (position.x + velocity.x > (screenDimensions.dx - radius)) {
    velocity.x = -1 * velocity.x;
  }

  if (velocity.x < 0 && position.x + velocity.x > (screenDimensions.x + radius)) {
    position.x += velocity.x;
  } else if (position.x + velocity.x < (screenDimensions.x + radius)) {
    velocity.x = -1 * velocity.x;
  }

  if (velocity.y > 0 && position.y + velocity.y < (screenDimensions.dy - radius)) {
    position.y += velocity.y;
  } else if (position.y + velocity.y > (screenDimensions.dy - radius)) {
    velocity.y = -1 * velocity.y;
  }

  if (position.y + velocity.y > (screenDimensions.y + radius)) {
    position.y += velocity.y;
  } else {
    velocity.y = -1 * velocity.y;
  }

  if (position.y > (screenDimensions.dy - radius - 1)) {
    playerCircle.onGround = true;
  } else {
    playerCircle.onGround = false;
  }

  return state;
  // return {
  //   playerCircle: {
  //     position: calculatePosition(playerCircle, screenDimensions),
  //     velocity: calculateVelocity(playerCircle, screenDimensions),
  //     onGround: calculateOnGround(playerCircle, screenDimensions)
  //     ...playerCircle
  //   }
  //   ...state
  // };
};
