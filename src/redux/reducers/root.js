import { combineReducers } from 'redux'
import { mapReducer } from './map-reducer'
import { statsReducer }  from './stats-reducer'


export default combineReducers({ 
  mapReducer,
  statsReducer
});
