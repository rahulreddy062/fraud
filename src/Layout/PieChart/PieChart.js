import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import React, { Component } from "react";
import { connect } from 'react-redux';

class PieChart extends Component{

   
    render(){
        return(
            <HighChartsReact  highcharts = {Highcharts} options = {this.props.piechart}/>  
        )
    }
}
const mapStateToProps =  state =>{
    return {
        piechart:state.PieChartReducer
    }
    
} 
export default connect(mapStateToProps)(PieChart);