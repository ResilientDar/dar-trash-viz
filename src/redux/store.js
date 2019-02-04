import { createStore } from 'redux'
import { reducer } from './reducers/map-reducer'

const store = createStore(reducer);

export { store };