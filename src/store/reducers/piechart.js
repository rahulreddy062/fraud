import * as actionTypes from '../actions/actionTypes';
const initialState = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie'
    },
    title: {
        text: '',
        
        x: 70
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y} ',
            size:700
            },
            
        }
    },
    series: [{
        name: 'Transactions',
        colorByPoint: true,
        data: [{
            name: 'Fraud Transactions',
            y: 0,
            color:"#ff4d4d"
        }, {
            name: 'On Hold Transactions',
            y: 0,
            color:"#ffa366"
        }, {
            name: 'Non Fraud Transactions',
            y: 0,
            color:"#00b300"
        }]
    }]
}
const piechart = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GETGRAPHDATA:
            let updatedState = {...state}
            const fraud = action.json.STATS_ML.FRAUD;
            const valid = action.json.STATS_ML.VALID;
            const on_hold = action.json.STATS_ML.ON_HOLD;
            const oldnonfraud = state.series[0].data[2].y;
            const old_on_hold = state.series[0].data[1].y;
            const oldfraud = state.series[0].data[0].y;
            updatedState.series[0].data[1].y = on_hold + old_on_hold;
            updatedState.series[0].data[2].y = valid + oldnonfraud;
            updatedState.series[0].data[0].y = fraud + oldfraud;
            console.log(updatedState);
            state = {...updatedState};
            return state;
    default:
        return state;
    }
}
export default piechart;
