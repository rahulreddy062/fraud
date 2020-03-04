import * as actionTypes from '../actions/actionTypes';
const initialState = {
    rules: [

    ],
    error:false
}
const patternRules = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PATTERNRULEGET:
            let updatedState = {...state};
            updatedState.rules = action.json ; 
            state = {...updatedState};
            return state;
        case actionTypes.PATTERNRULESET:
            let updatedState1 = {...state};
            if(action.json!==null){
                updatedState1.rules.push(action.json);
            updatedState1.error = action.error ; 
            state = {...updatedState1};
            }
            else{
                updatedState1.error = action.error ; 
            }
            
           
            state = {...updatedState1};
            console.log(state);
            return state;
        case actionTypes.DELETERULE:
                let updatedState2 = { ...state }
                console.log(action.id);
                console.log(updatedState2);
                for(let key in updatedState2.rules){
                    if(updatedState2.rules[key]["ID"]===action.id){
                        console.log(true)
                        delete updatedState2.rules[key]
                    }
                }
                state = {...updatedState2};
                console.log(state);
                return state;
       
        default:
            return state;

    }
}
export default patternRules;