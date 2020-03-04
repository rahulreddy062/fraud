import * as actionTypes from './actionTypes';

export const getPieData = ()=>{
    return (dispatch) =>{
     
        console.log('getPieData')
            fetch('http://54.190.196.94:5000')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(sendResult(json))
              });        
    }
}

export const sendResult = (json)=>{
    console.log('send')
    return {
        type:actionTypes.GETPIEDATA,
        json:json
    }
}