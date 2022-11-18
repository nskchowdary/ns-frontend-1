import * as types from '../actionsTypes/actionTypes'

const shapesReducers = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_SHAPES_START:
      return {
        ...state,
        loading: true,
      }
    case types.FETCH_SHAPES_SUCCESS:
      return {
        ...state,
        loading: false,
        shapes: action.payload,
      }
    case types.FETCH_SHAPES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export default shapesReducers
