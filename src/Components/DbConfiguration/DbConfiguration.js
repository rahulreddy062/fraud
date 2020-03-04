import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import validator from 'validator';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2)
  },
}));


export default function CenteredGrid() {
  const [disabled,setDisabled] = React.useState(true);
  const classes = useStyles();
    let formHandler = ()=>{
        console.log('This is hello')
    }
    let inputHandler = (event) =>{
        if(validator.isURL(event.target.value)){
          let disabledChange = disabled;
          disabledChange = false;
          setDisabled(disabledChange);
        }
        if(!validator.isURL(event.target.value)){
          let disabledChange = disabled;
          disabledChange = true;
          setDisabled(disabledChange);
        }
    }
  return (
    <div style = {{marginTop:"60px",height:"1000px"}} className={classes.root}>
      
      <Grid container spacing={2}>
                  <Grid xs={1}>
                  </Grid>
                  <Grid xs={10}>
          <Paper style={{height:"420px"}} className={classes.paper}>
             
                  
                  <Typography style={{textAlign:"left",fontWeight:"bold"}}>
                  DB CONFIGURATION
              </Typography>
              <Typography  style={{textAlign:"left",fontSize:"16px",color:"#B0B3B5"}}>
                 All fields are required unless marked as 'Optional'
              </Typography>
              <br/>
              <form onSubmit={formHandler}>
                  <Grid container>
                  <Grid xs={6} spacing={2}>
              <input placeholder="Enter your URL" onChange={inputHandler} style={{width:"600px",height:"40px"}} required type="url" name="homepage"/><br/>
              </Grid>
              <Grid  xs={3}>     
              <Button variant="contained" disabled ={disabled} type= "submit"style={{backgroundColor:"white",color:"#4BC286",width:"200px",marginTop:"5px"}}>Submit Connection </Button>
              </Grid>
                  </Grid>
              <p style={{textAlign:"left",fontSize:"12px",color:"#B0B3B5"}}>Currently we support only Mongo DB Database</p>
              <Grid xs = {6}>
              <input placeholder="Database Name" style={{width:"600px",height:"40px"}} required type="text" name="homepage"/><br/>
              </Grid>
              <Grid xs = {6}>
              <input placeholder="Collection Name" style={{marginTop:"40px",width:"600px",height:"40px"}} required type="text" name="homepage"/><br/>
              </Grid>
              <br/>
              <br/>
              <br/>
              <Button variant="contained"  type= "submit"style={{backgroundColor:"#4BC286",color:"white"}}>Save </Button>
      </form>
          </Paper>
          </Grid>
          </Grid>
        
    </div>
  );
}
