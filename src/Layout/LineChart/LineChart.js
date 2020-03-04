import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import SnackBar from '../../Layout/SnackBar/SnackBar'

class LineChart extends Component{
    
      componentDidMount(){
          this.props.onGraphData()
      }
      componentDidUpdate(){
            this.props.onGraphData()
      }
    render(){
        return(
            <div>
            <HighChartsReact  highcharts = {Highcharts} options = {this.props.highcharts}/>  
            {this.props.highcharts.error!==false?<SnackBar/>:null}
            </div>
        )
    }
}
const mapStateToProps =  state =>{
    return {
        highcharts:state.LineChartReducer
    }
    
} 

const dispatchStateToProps = (dispatch) =>{
    return {
        onGraphData:()=>dispatch(actions.getGraphData()),
        onInit:()=>dispatch(actions.init())
    }

}
export default connect(mapStateToProps,dispatchStateToProps)(LineChart);