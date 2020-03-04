import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open:true,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal,open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  console.log(props.value)
  return (
    <div>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
          {props.value==="true"?<Alert onClose={handleClose} severity="success">
          Transaction Accepted
        </Alert>: <Alert onClose={handleClose} severity="error">
          Transaction Rejected
        </Alert>}
        
        </Snackbar>
    </div>
  );
}
