import Highcharts from 'highcharts';
import * as actionTypes from '../actions/actionTypes';
const initialState = {
        title:{
            text:`<b>Machine Learning Performance<b>`,
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
          categories: [new Date().toLocaleTimeString()]
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
            name:["fraudulent data"],
            color:"#ff0000",
            data:[0] 
        },
    {
        name:[" non fraudulent data"],
        color:"#008000",
        data:[0]
    },
    {
        name:["on hold"],
        color:"#FFA500",
        data:[0]
        },
       
      ],   
    stackLabels: {
        enabled: true,
        style: {
            fontWeight: 'bold',
            color: ( // theme
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
            ) || 'gray'
        }
    },
    totalFraudulentData:0,
    totalNonFraudulentData:0,
    totalOnHoldData:0,
    insightsdata: [],
    insightsNFdata: [],
    error:false
    }
const linechart = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GETGRAPHDATA:
            let updatedState = {...state}
            updatedState.series[0].data.push(action.json.STATS_ML.FRAUD );
            updatedState.series[1].data.push(action.json.STATS_ML.VALID);
            updatedState.series[2].data.push(action.json.STATS_ML.ON_HOLD );
            const fraud = action.json.STATS_ML.FRAUD;
            const valid = action.json.STATS_ML.VALID;
            const on_hold = action.json.STATS_ML.ON_HOLD;
            const oldnonfraud = state.totalNonFraudulentData;
            const old_on_hold = state.totalOnHoldData;
            const oldfraud = state.totalFraudulentData;
            updatedState.xAxis.categories.push(new Date().toLocaleTimeString());
            updatedState.totalOnHoldData = on_hold + old_on_hold;
            updatedState.totalNonFraudulentData = valid + oldnonfraud;
            updatedState.totalFraudulentData = fraud + oldfraud;
            updatedState.error = false;
            updatedState.insightsdata = action.json.STATS_TABLE.STATS_TABLE_FRAUDULENT
            updatedState.insightsNFdata =  action.json.STATS_TABLE.STATS_TABLE_NON_FRAUDULENT
            //  updatedState.xAxis.categories = updatedState.xAxis.categories.push(new Date());
            state = {...updatedState};
            return state;
        case actionTypes.INIT:
            return state;
        case actionTypes.SENDERROR:
            let updatedState1 = {...state};
            updatedState1.error = true;
            state = {...updatedState1}
            return state;
        default:
            return state;
    }   
}
export default linechart