/* eslint-disable no-unused-vars */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snacks() {
  const [open,setOpen] = React.useState(false);
  let patternRuleReducer = useSelector(state => state.patternRuleReducer.error);
  

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  

  return (
    <div >
      
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={patternRuleReducer} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Enter a Correct Format
        </Alert>
      </Snackbar>
    </div>
  );
}