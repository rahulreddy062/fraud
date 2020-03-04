import * as actionTypes from '../actions/actionTypes';
import Highcharts from 'highcharts';
const initialState = {
    
    // chart:{
    //     type:'column'
    // },
    
    title:{
        text:`<b>Pattern Performance<b>`,
        align: 'left',
        
    },
    yAxis: {
      title: {
          text: 'No of Non Fraudulent Transactions'
      }
  },
    xAxis:{
      title:{
        text:'Time'
      },
      categories: [new Date()]
    },
  plotOptions: {
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: true
        }
    }
},

    series:[{
        name:["Blocked Transactions"],
        color:"#ff0000",
        data:[0] 
    },
{
    name:["Allowed Transactions"],
    color:"#008000",
    data:[0]
}, ],

   
stackLabels: {
    enabled: true,
    style: {
        fontWeight: 'bold',
        color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
        ) || 'gray'
    }
}
}
const patternchart = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GETGRAPHDATA:
            let updatedState = {...state};
            updatedState.xAxis.categories.push(new Date().toLocaleTimeString());
            console.log(action.json.STATS_PATTERNS.ACCEPTED);
            updatedState.series[0].data.push(action.json.STATS_PATTERNS.BLOCKED);
            updatedState.series[1].data.push(action.json.STATS_PATTERNS.ACCEPTED);
            state = {...updatedState};
            console.log(state);
            return state;
        default:
            return state;
    }   
}
export default patternchart;