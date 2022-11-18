import { applyMiddleware, createStore } from 'redux'
import createSagaMiddileware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddileware()

const middlware = [sagaMiddleware]

const store = createStore(rootReducer, applyMiddleware(...middlware))
sagaMiddleware.run(rootSaga)

export default store
