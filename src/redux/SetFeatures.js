import {setFeatures} from './action-creators';


function SetFeatures(features_){
	return (dispatch=>{
		dispatch(setFeatures(features_));
		console.log('sadfadfaf');
	})
}

export default SetFeatures;