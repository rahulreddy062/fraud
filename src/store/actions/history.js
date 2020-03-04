import * as actionTypes from './actionTypes';
export const sendResult = (json)=>{
    console.log('send')
    return {
        type:actionTypes.REVIEWEDTRANSACTIONS,
        json:json
    }
}

export const getReviewedData = ()=>{
    return (dispatch) =>{
        console.log('getHistory')
            fetch('http://54.190.196.94:5000/review/history')
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                dispatch(sendResult(json))
              });        
    }
}