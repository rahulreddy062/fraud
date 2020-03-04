import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Grid } from "@material-ui/core";
import BootStrapModal from "../../Layout/BootstrapModal/BootstrapModal";
import Add from "./add.png";
import Delete from "./delete.png";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class PatternRule extends PureComponent {
  createData(icon, name, del) {
    return { icon, name, del };
  }
  rows = [];
  deleteHandler(id) {
    this.props.onDeleteRule(id);
  }
  componentDidMount() {
    this.props.onRule();
  }
  componentDidUpdate() {
    //   this.props.onRule();
  }

  render() {
    this.rows = [];
    for (let key in this.props.values.rules) {
      this.rows.push(
        this.createData(
          this.props.values.rules[key]["ACTION"] === "Block" ? (
            <img
              style={{ width: "25px", height: "auto" }}
              src={Delete}
              alt="Delete"
            />
          ) : (
            <img
              style={{ width: "25px", height: "auto" }}
              src={Add}
              alt="True"
            />
          ),
          this.props.values.rules[key]["PATTERN"],
          <IconButton
            onClick={() =>
              this.deleteHandler(this.props.values.rules[key]["ID"])
            }
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        )
      );
    }
    return (
      <div>
        <Grid container spacing={2}>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <TableContainer
              style={{ marginTop: "50px", minWidth: "120px" }}
              component={Paper}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Then, when should a payment be blocked/allowed?
                      <br />
                      <Typography
                        style={{ fontSize: "14px", color: "#697386" }}
                      >
                        These payments will not be assessed by block or review
                        rules.
                        <BootStrapModal />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <Grid container xs={12}>
                          <Grid item xs={2}>
                            {row.icon}
                          </Grid>
                          <Grid item xs={8}>
                            <h3
                              style={{ marginTop: "3px", marginLeft: "-80px" }}
                            >
                              {row.name}
                            </h3>
                          </Grid>
                          <Grid style={{ marginTop: "-10px" }} container xs={2}>
                            {row.del}
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    values: state.patternRuleReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRule: () => dispatch(actions.getRulesData()),
    onDeleteRule: id => dispatch(actions.deleteRule(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatternRule);
