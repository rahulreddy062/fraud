import * as actionTypes from './actionTypes';

export const sendResult = (json)=>{
    console.log('send')
    return {
        type:actionTypes.HISTORYTRANSACTIONS,
        json:json
    }
}

export const getHistoryData = ()=>{
    return (dispatch) =>{
     
        console.log('getHistory')
            fetch('http://54.190.196.94:5000/review')
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                dispatch(sendResult(json))
              });        
    }
}

export const postResult = (key,decision)=>{
    return (dispatch) =>{
        const opts ={
            TRANSACTION_ID:key,
            decision:decision
          }
          console.log(opts);
          fetch('http://54.190.196.94:5000/review',{
            method:'post',
            body:JSON.stringify(opts)
          }).then(function(response){
              console.log(response.json())
          }).then(function(data){
            console.log(data);
          })
          dispatch(sendReviewResult(key,decision))
    }
}

 const sendReviewResult = (key,decision)=>{
    console.log('sendReviewResult')
    return {
        type:actionTypes.POSTTRANSACTIONS,
        key:key,
        decision:decision
    }
}

export const postDeleteResult = (key,decision)=>{
    return (dispatch) =>{
        const opts ={
            TRANSACTION_ID:key,
            decision:decision
          }
          console.log(opts);
          fetch('http://54.190.196.94:5000/review',{
            method:'post',
            body:JSON.stringify(opts)
          }).then(function(response){
              console.log(response.json())
          }).then(function(data){
            console.log(data);
          })
          dispatch(deleteReviewResult(key,decision))
    }
}

const deleteReviewResult = (key,decision)=>{
    console.log('sendReviewResult')
    return {
        type:actionTypes.DELETETRANSACTIONS,
        key:key,
        decision:decision
    }
}