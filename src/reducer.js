import { combineReducers } from 'redux'

import gameStateReducer from './features/gameState/gameStateSlice'

const rootReducer = combineReducers({
  gameState: gameStateReducer
})

export default rootReducer
