import React,{Component} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {connect} from 'react-redux';

class FraudInsights extends Component {
  //  insightsReducer = useSelector(state => state.LineChartReducer);
   createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  rows = []
  
    render(){
      this.rows = [
        this.createData("Transaction Amount", this.props.insights.insightsdata["AMOUNT"],this.props.insights.insightsNFdata["AMOUNT"]),
        this.createData("Age of Account", this.props.insights.insightsdata["AGE"],this.props.insights.insightsNFdata["AGE"]),
        this.createData("Distance of Transaction", this.props.insights.insightsdata["DISTANCE"],this.props.insights.insightsNFdata["DISTANCE"]),
        this.createData("malicious email domains", this.props.insights.insightsdata["MALICIOUS_DOMAINS"],this.props.insights.insightsNFdata["MALICIOUS_DOMAINS"]),
        this.createData("Transactions on same day", this.props.insights.insightsdata["TRANSACTIONS_SAME_DAY"],this.props.insights.insightsNFdata["TRANSACTIONS_SAME_DAY"]),
      ];
        //  console.log(this.props.insights.insightsdata["AGE"])
  return (
    <TableContainer style={{height:"400px"}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style = {{color:"#FFFFF"}}>FRAUD INSIGHTS</TableCell>
            <TableCell style={{ color: "red" }} align="center">
              FRAUDULENT
            </TableCell>
            <TableCell style={{ color: "green" }} align="right">
              NON FRAUDULENT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    }
}
const mapStateToProps =   state => {
  return {
    insights:state.LineChartReducer
  }
}
export default connect(mapStateToProps,null)(FraudInsights);