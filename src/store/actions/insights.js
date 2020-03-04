import * as actionTypes from './actionTypes';
export const getGraphData = ()=>{
    return (dispatch) =>{
     
     
            fetch('http://54.190.196.94:5000')
            .then(response => response.json())
            .then(json => {
                dispatch(sendResult(json))
              }).catch(error=>{
                dispatch(sendError(true));
              })
              ;        
    }
}

export const sendError = (error)=>{
    
 
    return {
        type:actionTypes.SENDERROR,
        error:error
    }
}

export const sendResult = (json)=>{
    return {
        type:actionTypes.GETGRAPHDATA,
        json:json
    }
}
export const init = () =>{
    return {
        type:actionTypes.INIT
    }
}
