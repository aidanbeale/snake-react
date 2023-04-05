const initialState = {
  food: [3, 2],
  direction: "RIGHT",
  speed: 500,
  route: "menu",
  snakeDots: [[0, 0], [0, 2]]
}

export default function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'gameState/setDirection': {
      return {
        ...state,
        direction: action.payload
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
    default:
      return state
  }
}
