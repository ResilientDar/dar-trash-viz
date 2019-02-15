import { createStore } from 'redux'
import reducer from './reducers/root'

const store = createStore(reducer);

console.log(store.getState())

export { store };