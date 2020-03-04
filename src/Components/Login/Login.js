import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import img from './iv_logo.png';
import * as actions from '../../store/actions/index';
import bg from './bg.png';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends Component {
  state = {
    email:'',
    password:'',
  }
  
  emailChangedHandler = (event) =>{
    const updatedControls = {
      ...this.state
    }
    updatedControls.email = event.target.value;
    this.setState({email:updatedControls.email})
  }
  passwordChangedHandler = (event) =>{
    const updatedControls = {
      ...this.state
    }
    updatedControls.password = event.target.value;
    this.setState({password:updatedControls.password})
  }
  
    handleSubmit = (event) =>{
      
      event.preventDefault();
      this.props.onAuth(this.state.email,this.state.password);
      sessionStorage.setItem('token',this.props.login.token);
      this.props.history.push('/dashboard'); 
    }
   
    render(){
        const { classes } = this.props;
      return(
        
          <div style={{paddingTop:"150px",height:"100vh",backgroundImage: `url(${bg})`}}>
          
          <Container  component="main" maxWidth="xs">    
      <CssBaseline />
      <div style = {{backgroundColor:"#ffffff",boxShadow:"1px 3px 2px grey",borderRadius:"10px",padding:"40px 15px 80px 15px"
    }}className={classes.paper}>
        <img style = {{width:"40%",height:"20%"}}src = {img}  alt = "logo"/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  onSubmit = {this.handleSubmit} className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {(event)=>this.emailChangedHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            onChange = {(event)=>this.passwordChangedHandler(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
     <Button
            type="submit"
            fullWidth
            
            //  href="/dashboard"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      
    </Container>
    </div>
    )
    }
}

const mapStateToProps = state =>{
  return {
    login:state.LoginReducer
  }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email,password) => dispatch(actions.auth(email,password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(Login));