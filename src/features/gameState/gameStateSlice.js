const initialState = {
  food: [12, 2],
  direction: "RIGHT",
  speed: 200,
  route: "menu",
  snakeDots: [[0, 0], [0, 2]],
  score: 33,
  gameOver: false
}

export default function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'gameState/setFood': {
      return {
        ...state,
        food: action.payload
      }
    }
    case 'gameState/setDirection': {
      return {
        ...state,
        direction: action.payload
      }
    }
    case 'gameState/setSpeed': {
      return {
        ...state,
        speed: action.payload
      }
    }
    case 'gameState/setSnakeDots': {
      return {
        ...state,
        snakeDots: action.payload
      }
    }
    case 'gameState/setRoute': {
      return {
        ...state,
        route: action.payload
      }
    }
    case 'gameState/setScore': {
      return {
        ...state,
        score: action.payload
      }
    }
    case 'gameState/gameOver': {
      return {
        ...state,
        gameOver: true
      }
    }
    case 'gameState/reset': {
      return initialState;
    }
    default:
      return state
  }
}
