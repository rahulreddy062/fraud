import * as actionTypes from '../actions/actionTypes';


const initialState = {
  token:null,
  userId:null,
  error:null,
  isAuth:true
}
const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.AUTH_START:
      const updatedState = {...state};
      updatedState.error = null;
      updatedState.token = action.idToken;
      state = {...updatedState};
      return state;
    case actionTypes.AUTH_SUCCESS:
      console.log(action.token);
      const updatedState1 = {...state};
      updatedState1.token = action.token;
      updatedState1.userId = action.userId;
      updatedState1.error = null;
      updatedState1.isAuth = true;
      console.log('history');
      state = {...updatedState1};
      return state;
    case actionTypes.AUTH_FAIL:
      const updatedState2 = {...state};
      updatedState2.error  = action.error; 
      state = {...updatedState2};
      return state;
    case actionTypes.AUTH_LOGOUT:
      const updatedState3 = {...state};
      updatedState3.token = null;
      updatedState3.userId = null;
      state = {...updatedState3};
      return state;
    default:
      return state;
  }

}
export default reducer;