import React, { useEffect } from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width:1200,
        paddingLeft: '40px',
        fontSize:'1rem'
        
    },
    margin: {
        height: theme.spacing(3),
       
    },
    
    table: {
        minWidth: 650,
      },
    
}));

// const marks = [
//     {
//         value: 0,
//         label: 'Min (0)',
//     },
//     {
//         value: 25,
//         label: '25',
//     },
//     {
//         value: 50,
//         label: '50',
//     },
//     {
//         value: 75,
//         label: '75',
//     },
    
    
//     {
//         value: 100,
//         label: 'Max(100)',
//     },
// ];

// function valuetext(value) {
//     return `${value}`;
// }
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
// function valueLabelFormat(value) {
//     return marks.findIndex(mark => mark.value === value) + 1;
// }

export default function DiscreteSlider() {
    const [Amount_blocked,setAmountBlocked] = useState([]);
    const [Customer_blocked,setCustomerBlocked] = useState([]);
    const [score,setScore] = useState([]);
    const [Transactions_Blocked,setTransactionsBlocked] = useState([]);
    const [counter,setCounter]= useState([]);
    useEffect(()=>{
      
    },[])
    
  useEffect(()=>{  
    //      {fetch('http://34.220.188.183:5000/risk/score')
    // .then(response => response.json())
    // .then(json => {
    },[counter])
    
   
   function changeHandler(event,value){
    const opts = {
        risk_score:value
    }
      fetch("http://54.190.196.94:5000/risk",{
        method:'post',
    body:JSON.stringify(opts)
      })
      .then(response=>{
       return  response.text()} )
      .then(responseData=>
        {
          // eslint-disable-next-line no-eval
          const json = JSON.stringify(eval("("+responseData+")"))
          const jsonObj = JSON.parse(json);
             let  NewAmountblocked = [] ;
       let NewCustomer_blocked = [];
       let Newscore = [] ;
       let NewTransactions_Blocked = [] ;

        for(let key in jsonObj){
            NewAmountblocked.push(jsonObj[key].Amount_Blocked);
            NewCustomer_blocked.push(jsonObj[key].Customers_Blocked);
            Newscore.push(jsonObj[key].Score);
            NewTransactions_Blocked.push(jsonObj[key].Transactions_Blocked);    
        }
       setAmountBlocked(NewAmountblocked);
       setCustomerBlocked(NewCustomer_blocked);
       setScore(Newscore);
       setTransactionsBlocked(NewTransactions_Blocked);
        }
      )
     let updatedCounter = counter + 1;
     setCounter(updatedCounter);
    }
    let rows = [
      
    ];
    for(let i=0;i<Amount_blocked.length;i++){
        rows.push(createData(Amount_blocked[i],Customer_blocked[i],score[i],Transactions_Blocked[i])) 
    }

    function createData(Amount_blocked, Customer_blocked, score,Transactions_Blocked) {
      return {Amount_blocked, Customer_blocked,score,Transactions_Blocked };
    }

    const classes = useStyles();
    return (
        <div style = {{height:"1000px"}}className={classes.root}>
            <Grid container spacing={1}>
                <Grid xs ={2}>
                </Grid>
            <Grid xs ={9}>
            <div className={classes.margin} />
            <Typography id="discrete-slider-always"
                // fontWeight="400"

                gutterBottom>

            </Typography>
            <b>SET RISK SCORE</b>
            <br/>
            <br/>   
            {/* <Slider
              component={Paper}
                defaultValue={0}
                className={classes.fonter}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                
                step={1}
                valueLabel={{color:"black"}}
                
                onChangeCommitted = {(event,value)=>changeHandler(event,value)}
                valueLabelDisplay="on"
            />  */}
          
            <PrettoSlider valueLabelDisplay="on" aria-label="pretto slider" defaultValue={0} step={1}  onChangeCommitted = {(event,value)=>changeHandler(event,value)}/>
   
            <br></br>
            <br></br>
            
            <b>BUSINESS IMPACT</b>
            <br/>
            <br/>
            <TableContainer 
            
            component={Paper}>
        <Table  className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize:"1rem"}}align="center">Amount Blocked</TableCell>
              <TableCell style={{fontSize:"1rem"}} align="center">Customer Blocked</TableCell>
              <TableCell style={{fontSize:"1rem"}} align="center">Risk Score</TableCell>
              <TableCell style={{fontSize:"1rem"}} align="center">Transactions Blocked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell style={{fontSize:"1rem"}}align="center">{parseFloat(row.Amount_blocked).toFixed(2)}</TableCell>
                <TableCell style={{fontSize:"1rem"}} align="center">{row.Customer_blocked}</TableCell>
                <TableCell style={{fontSize:"1rem"}} align="center">{row.score}</TableCell>
                <TableCell style={{fontSize:"1rem"}} align="center">{row.Transactions_Blocked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      </Grid>
        
</div >
    );
}
      
   