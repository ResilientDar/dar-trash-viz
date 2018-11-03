import {setCurrentFeatureParent} from './action-creators';
import { store } from './store'
import * as Constants from '../constants'


// function setCurrentFeature(currentFeature){
// 	console.log("called from features");

// 	store.dispatch(setCurrentFeatureParent(currentFeature));

// 	// return (dispatch=>{
// 	// 	dispatch(setCurrentFeatureParent(currentFeature));
// 	// })
// }

function setCurrentFeature(currentFeature){
	console.log("called from features");
	store.dispatch({
	    type: Constants.SET_FEATURES,
	    currentFeature
	  });
}

export default setCurrentFeature;