import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Gmaps from '../Gmaps/Gmaps';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },    
  paper: {
    position:"absolute",
    width: 600,
    height:600,
    left:'30% !important',
    top:'10% !important',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textFont:{
      fontWeight:500
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  //const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        MoreInfo
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={handleClose}
      >
        <div  className={classes.paper}>
          <h2 id="simple-modal-title">More Information</h2>
          
          <Grid container spacing={3}>
          <Grid item xs={12}>
       <span className={classes.textFont}>First name:</span> {props.firstname}
       </Grid>
       <Grid item xs={12}>
       <span className={classes.textFont}>Last Name: </span>{props.lastname}
       </Grid>
       <Grid item xs={12}>
       <span className={classes.textFont}>City: </span>{props.city}
        </Grid>
        <Grid item xs={12}>
        <span className={classes.textFont}>MerchantDescription: </span>{props.merchantdescription}
       </Grid>
       <Grid item xs={12}>
       <span className={classes.textFont}> MerchantName:</span> {props.merchantname}
       </Grid>
       
      </Grid>
      <br/>
      <div style={{border:"0px"}}>
        <Gmaps cardregisteredlatitude={props.cardregisteredlatitude}
                     cardregisteredlongitude={props.cardregisteredlongitude}
                     cardpurchasedlatitude = {props.cardpurchasedlatitude}
                     cardpurchasedlongitude = {props.cardpurchasedlongitude}
                     />
        </div>
      
        </div>
        
      </Modal>
    </div>
  );
}


