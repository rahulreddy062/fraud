import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import LineChart from '../../Layout/LineChart/LineChart';
import PieChart from '../../Layout/PieChart/PieChart';
import FraudInsights from '../../Layout/Table/Table';
import PatternChart from '../../Layout/PatternChart/PatternChart';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Insights() {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <br/>
        <br/>
      <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
  <Card className={classes.paper}>
      <LineChart style = {{boxShadow:"3px 3px 3px #9E9E9E"}}/>
      </Card>
        </Grid>
          <Grid item xs={12} md={8}>
            <Card style={{paddingBottom:"4px",paddingTop:"28px"}}>
              <PieChart />
              </Card>
          </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <PatternChart/>
      </Grid>
      <Grid item xs={12} md={4}>
      
        <FraudInsights style = {{boxShadow:"3px 3px 3px #9E9E9E"}}/>
        
      </Grid>
      </Grid>
    </div>
  );
}