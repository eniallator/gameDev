const radius = 50;
const movementSpeed = 0.2;
const jumpPower = -30;
const gravity = 0.19;
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

function getProjectedOutOfBounds(position,velocity,screenDimensions){

  const projectedX = position.x + velocity.x;
  const projectedY = position.y + velocity.y;

  return {
    left: projectedX < (screenDimensions.x + radius),
    right: projectedX > (screenDimensions.dx - radius),
    top: projectedY < (screenDimensions.y + radius),
    bottom: projectedY > (screenDimensions.dy - radius)
  };
}

function calculatePosition(oldPosition, velocity, screenDimensions) {
  const newPosition = {
    x: oldPosition.x,
    y: oldPosition.y
  };

  const isProjectedOutOfBounds = getProjectedOutOfBounds(newPosition,velocity,screenDimensions)

  if (!isProjectedOutOfBounds.left && !isProjectedOutOfBounds.right) {
    newPosition.x += velocity.x;
  }

  if (!isProjectedOutOfBounds.top && !isProjectedOutOfBounds.bottom) {
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

  if(onGround && Math.abs(newVelocity.y) < 1){
    newVelocity.y = 0;
  }
  if(keysPressed.w && onGround){
    newVelocity.y = jumpPower;
  }
  if(keysPressed.d){
    newVelocity.x += movementSpeed;
  }
  if(keysPressed.a){
    newVelocity.x -= movementSpeed;
  }

  const isProjectedOutOfBounds = getProjectedOutOfBounds(position, newVelocity, screenDimensions)

  if (isProjectedOutOfBounds.left || isProjectedOutOfBounds.right) {
    newVelocity.x = -1 * newVelocity.x;
  }

  if ((isProjectedOutOfBounds.bottom && newVelocity.y > 1) || isProjectedOutOfBounds.top) {
    newVelocity.y = -1 * newVelocity.y;
  }

  if(!isProjectedOutOfBounds.bottom) {
    newVelocity.y += gravity;
  }

  newVelocity.x *= drag;
  newVelocity.y *= drag;

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
