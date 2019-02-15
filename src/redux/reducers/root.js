import { combineReducers } from 'redux'
import { mainReducer } from './main-reducer'
import { statsReducer }  from './stats-reducer'


export default combineReducers({ 
  main: mainReducer,
  stats: statsReducer
});
