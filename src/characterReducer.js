const radius = 50;
const movementSpeed = 0.2;
const jumpPower = -30;
const gravity = 0.09;
const drag = 0.97;

const initialState = {
  position : {
    x : 200,
    y : 350
  },
  velocity : {
    x : 0,
    y : 0
  },
  radius : radius,
  onGround : false
};

function calculatePosition(oldPosition, velocity, screenDimensions) {
  const newPosition = {
    x: oldPosition.x,
    y: oldPosition.y
  };

  if (velocity.x > 0 && newPosition.x + velocity.x < (screenDimensions.dx - radius)) {
    newPosition.x += velocity.x;
  }

  if (velocity.x < 0 && newPosition.x + velocity.x > (screenDimensions.x + radius)) {
    newPosition.x += velocity.x;
  }

  if (velocity.y > 0 && newPosition.y + velocity.y < (screenDimensions.dy - radius)) {
    newPosition.y += velocity.y;
  }

  if (newPosition.y + velocity.y > (screenDimensions.y + radius)) {
    newPosition.y += velocity.y;
  }

  return newPosition;
}

function calculateVelocity(playerCircle, keysPressed, screenDimensions) {
  const {
    position,
    velocity,
    onGround
  } = playerCircle;

  const newVelocity = {
    x: velocity.x,
    y: velocity.y
  };

  if(keysPressed.w && onGround){
    newVelocity.y = jumpPower;
  }
  if(keysPressed.d){
    newVelocity.x += movementSpeed;
  }
  if(keysPressed.a){
    newVelocity.x -= movementSpeed;
  }

  newVelocity.x *= drag;
  newVelocity.y *= drag;
  newVelocity.y += gravity;

  if (position.x + newVelocity.x > (screenDimensions.dx - radius)) {
    newVelocity.x = -1 * newVelocity.x;
  }

  if (position.x + newVelocity.x < (screenDimensions.x + radius)) {
    newVelocity.x = -1 * newVelocity.x;
  }

  if (position.y + newVelocity.y > (screenDimensions.dy - radius)) {
    newVelocity.y = -1 * newVelocity.y;
  }

  if (position.y + newVelocity.y < (screenDimensions.y + radius)){
    newVelocity.y = -1 * newVelocity.y;
  }

  return newVelocity
}

function calculateOnGround(position, screenDimensions){
  if (position.y > (screenDimensions.dy - radius - 1)) {
    return true;
  }

  return false;
}

module.exports = function characterReducer(state) {
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
  const velocity = calculateVelocity(playerCircle, keysPressed, screenDimensions);

  return {
    ...state,
    playerCircle: {
      ...playerCircle,
      velocity: velocity,
      position: calculatePosition(playerCircle.position, velocity, screenDimensions),
      onGround: calculateOnGround(playerCircle.position, screenDimensions)
    }
  };
};
