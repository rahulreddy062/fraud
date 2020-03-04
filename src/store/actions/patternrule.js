import * as actionTypes from './actionTypes';
export const getRules = (json)=>{
    console.log('send')
    return {
        type:actionTypes.PATTERNRULEGET,
        json:json
    }
}

export const getRulesData = ()=>{
    return (dispatch) =>{
        console.log('getRules')
            fetch('http://54.190.196.94:5000/patterns')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(getRules(json))
              });        
    }
}

export const setRulesData = (json,error) =>{
    return {
        type:actionTypes.PATTERNRULESET,
        error:error,
        json:json
    }
}
export const postRulesData = (message)=>{
    return (dispatch) =>{
        const opts ={
            message:message
          }
          console.log(opts);
          fetch('http://54.190.196.94:5000/patterns/add',{
            method:'post',
            body:JSON.stringify(opts)
          }).then(function(response){
              return response.text()
          }).then(function(responseData){
            // eslint-disable-next-line no-eval
            const json = JSON.stringify(eval("("+responseData+")"))
            let jsonObj = JSON.parse(json);
            console.log(jsonObj)
            let relativeObj = jsonObj;
            relativeObj["INDEX"]= jsonObj["message"];
            jsonObj = {...relativeObj}
            console.log(jsonObj)
            if(jsonObj.message==="ERROR"){
                console.log("true")
                dispatch(setRulesData(null,true))
            }
            else {
                dispatch(setRulesData(jsonObj,false))
            }
          })
         
    }
}

export const deleteRule = (id)=>{
    return (dispatch) =>{
        const opts ={
            index:id
          }
          console.log(opts);
          fetch('http://54.190.196.94:5000/patterns/delete',{
            method:'post',
            body:JSON.stringify(opts)
          }).then(function(response){
              console.log(response.json())
          }).then(function(data){
            console.log(data);
          })
          dispatch(postdeleterule(id))
    }
}

 const postdeleterule = (id)=>{
    console.log(id)
    return {
        type:actionTypes.DELETERULE,
        id:id
    }
}
