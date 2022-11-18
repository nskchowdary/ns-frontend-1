import { takeLatest, all, put, fork, call } from 'redux-saga/effects'
import * as types from './actionsTypes/actionTypes'
import { getPapers, getShapes } from './apis'

export function* onLoadPaperAsync() {
  try {
    const response = yield call(getPapers)
    yield put({ type: types.FETCH_PAPER_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: types.FETCH_PAPER_FAIL, payload: error })
  }
}
export function* onLoadPaper() {
  yield takeLatest(types.FETCH_PAPER_START, onLoadPaperAsync)
}

const paperSaga = [fork(onLoadPaper)]

export function* onLoadShapesAsync() {
  try {
    const response = yield call(getShapes)
    yield put({ type: types.FETCH_SHAPES_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: types.FETCH_SHAPES_FAIL, payload: error })
  }
}
export function* onLoadShapes() {
  yield takeLatest(types.FETCH_SHAPES_START, onLoadShapesAsync)
}

const shapesSaga = [fork(onLoadShapes)]
export default function* rootSaga() {
  yield all([...paperSaga, ...shapesSaga])
}
