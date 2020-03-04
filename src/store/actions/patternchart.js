import * as actionTypes from './actionTypes';
export const getPatternChartData = ()=>{
    return (dispatch) =>{
        console.log('getPatternData')
            fetch('http://54.190.196.94:5000')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(sendPatternResult(json))
              }).catch(error=>{
                  console.log(error);
              })
              ;        
    }
}

export const sendPatternResult = (json)=>{
    console.log('sendPatternResult')
    return {
        type:actionTypes.GETPATTERNDATA,
        json:json
    }
}