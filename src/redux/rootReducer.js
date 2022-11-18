import { combineReducers } from 'redux'
import paperReducer from './reducers/paperReducers'
import shapesReducers from './reducers/shapesReducers'

const rootReducer = combineReducers({
  paper: paperReducer,
  shapes: shapesReducers,
})

export default rootReducer
