import * as actionTypes from '../actions/actionTypes';
const initialState = {
    blocks: [

    ],
}
let blocklist = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.GETBLOCKLIST:
            let updatedState = {...state};
            updatedState.blocks = action.json;
            state = {...updatedState};
            return state;
        case actionTypes.DELETEBLOCKLIST:
            let updatedState1 = {...state};
            for( let key in updatedState1.blocks){
                if(Object.keys(updatedState1.blocks[key])[0]===action.name){
                   delete updatedState1.blocks[key]
                }
            }
            state = {...updatedState1}
            return state;
        case actionTypes.DELETECATEGORY:
                let updatedState3 = {...state};
                for(let key in updatedState3.blocks){
                    if(Object.keys(updatedState3.blocks[key])[0]===action.name){
                        for(let key2 in updatedState3.blocks[key]){
                            for(let i =0;i<updatedState3.blocks[key][key2]["CATEGORY"].length;i++){
                                if(updatedState3.blocks[key][key2]["CATEGORY"][i]===action.category&&updatedState3.blocks[key][key2]["VALUE"][i]===action.value){
                                    console.log(Object.keys(updatedState3.blocks[key][key2]["CATEGORY"]))
                                    delete updatedState3.blocks[key][key2]["CATEGORY"][i]  ;
                                  delete updatedState3.blocks[key][key2]["VALUE"][i] ;
                                }
                            }
                            console.log(Object.keys(updatedState3.blocks[key][key2]["CATEGORY"]))
                            if(Object.keys(updatedState3.blocks[key][key2]["CATEGORY"]).length===0){
                                delete updatedState3.blocks[key]
                            }
                        }
                    }
                }
                
                state = {...updatedState3};
                console.log( state);
                return state;
        case actionTypes.POSTAFTERCATEGORY:
            return state;
        default:
            return state;
    }
}
export default blocklist;