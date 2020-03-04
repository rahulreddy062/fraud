import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import React, { Component } from "react";
import { connect } from 'react-redux';

class PatternChart extends Component{
    render(){
        return(
            <div>
            <HighChartsReact  highcharts = {Highcharts} options = {this.props.patternchart}/>  
            </div>
        )
    }
}
const mapStateToProps =  state =>{
    return {
        patternchart:state.patternchartReducer
    }
    
} 
export default connect(mapStateToProps)(PatternChart);