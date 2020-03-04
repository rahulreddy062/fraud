import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import * as actions from "../../store/actions/index";
import Category from './Category';

const useStyles = makeStyles(theme => ({
  paper: {
 
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function BlockList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const nameRef = React.useRef("");
  const typeRef = React.useRef("");
  const [Lists, setLists] = React.useState([]);
  const dispatch = useDispatch();
  const blockLists = useSelector(state => state.blocklistReducer);
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    dispatch(actions.getBlockListData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleName = e => {
    setName(nameRef.current.value);
  };
  const handleType = e => {
    setType(typeRef.current.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    let updatedLists = [...Lists];
    updatedLists.push([name, type]);
    setLists(updatedLists);
    handleClose();
  };
  const deleteHandler1 = (name, type) => {
    for (let i = 0; i < Lists.length; i++) {
      if (Lists[i][0] === name && Lists[i][1] === type) {
        let updatedLists = [...Lists];
        updatedLists.splice(i, 1);
        setLists(updatedLists);
      }
    }
  };
  const deleteHandler2 = blockLists => {
    dispatch(actions.deleteBlockList(Object.keys(blockLists)[0]));
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
   
        <Grid item xs={12}>
          <Paper elevation={4}>
            <Typography
              style={{
                textAlign: "left",
                fontWeight: "bold",
                marginLeft: "12px"
              }}
            >
              Lists
            </Typography>
            <Typography
              style={{
                textAlign: "left",
                color: "#697386",
                marginLeft: "12px"
              }}
            >
              Create lists, like a suspicious email domain block list or a
              trusted IP address allow list, to reference in your rules.
            </Typography>
        
          </Paper>
        </Grid>
      
        <Button
              onClick={handleOpen}
              variant="outlined"
              style={{marginLeft:6}}
            >
              Add List
            </Button>
      
           
      </Grid>
      <br />
      <br />
      {Object.keys(blockLists.blocks).map(i => {
        return (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Paper elevation={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {Object.keys(blockLists.blocks[i])}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {
                          blockLists.blocks[i][
                            Object.keys(blockLists.blocks[i])
                          ]["LIST_TYPE"]["0"]
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        Nisarg@gmail.com
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => deleteHandler2(blockLists.blocks[i])}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                     <Category name={Object.keys(blockLists.blocks[i])[0]}/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <br />
          </div>
        );
      })}
      {Lists.map(i => {
        return (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {i[0]}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {i[1]}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        Nisarg@gmail.com
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ marginTop: "12px" }}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => deleteHandler1(i[0], i[1])}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      <Category name={i[0]}/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <br />
          </div>
        );
      })}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography style={{ fontWeight: "bold", marginLeft: "-10px" }}>
            Add List
          </Typography>
          <br />
          <Grid container spacing={3}>
            <form onSubmit={event => handleSubmit(event)}>
              <Grid item xs={12}>
                <Typography> ListName : </Typography>{" "}
                <input
                  style={{
                    width: "300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingBottom: 0,
                    marginTop: 0,
                    fontWeight: 500
                  }}
                  required="true"
                  ref={nameRef}
                />
                <Typography> ListType : </Typography>{" "}
                <input
                  style={{
                    width: "300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingBottom: 0,
                    marginTop: 0,
                    fontWeight: 500
                  }}
                  ref={typeRef}
                  required="true"
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
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleName();
                        handleType();
                      }}
                      type="submit"
                      color="primary"
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Modal>
     </div>
  );
}
export default BlockList;
