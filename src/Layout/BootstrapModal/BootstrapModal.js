import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/index';
import Snacks from './ErroMessage';



const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    left:'35% !important',
    top:'30% !important',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BootstrapModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("");
  const valueRef = React.useRef("")

  const handleSubmit = event => {
    event.preventDefault();
      dispatch(actions.postRulesData(value));  
        // handleClose();
  };
  const handleAdd = e => {
    setValue(valueRef.current.value);
  } 

  return (
    <div>
      <Button
          variant="outlined"
          color="primary"
          style={{marginLeft:"870px"}}
          onClick = {handleOpen}
          startIcon={<AddIcon />}>
          Add
        </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography style={{ fontWeight: "bold", marginLeft: "-10px" }}>
            Add Rule
          </Typography>
          <Typography style={{ fontWeight: "bold", marginLeft: "-10px" }}>
          Patterns Accepted Format : <Typography> Block/Allow if category [=,==,&gt;,&gt;=,&lt;,&lt;=] value</Typography>
          </Typography>
          <br/>
          <Grid container spacing={3}>
            <form onSubmit={event => handleSubmit(event)}>
              <Grid item xs={12}>
                <Typography> Rule : </Typography>{" "}
                <input
                  style={{
                    width: "300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingBottom: 0,
                    marginTop: 0,
                    fontWeight: 500
                  }}
                  ref={valueRef} 
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button onClick={handleClose} variant="contained">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" onClick = {handleAdd} type="submit" color="primary">
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <br />
        </div>
      </Modal>
      <Snacks/>
        </div>
  );
}
