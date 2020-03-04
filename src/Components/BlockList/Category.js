import { makeStyles } from "@material-ui/core/styles";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import * as actions from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    left: "35% !important",
    top: "20% !important",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
function Category(props) {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const categoryRef = React.useRef("");
  const valueRef = React.useRef("");
  const dispatch = useDispatch();
  const blockLists = useSelector(state => state.blocklistReducer);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(()=>{
    console.log("Component Mounted");
  },[blockLists.blocks]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCategory = e => {
    setCategory(categoryRef.current.value);
  };
  const handleValue = e => {
    setValue(valueRef.current.value);
   
  };

  const handleCategorySubmit = event => {
    event.preventDefault();
    let updatedCategories = [...categories];
    updatedCategories.push([category, value]);
    setCategories(updatedCategories);
    valueRef.current.value="";
    categoryRef.current.value=""
  };
  const deleteHandler1 = (name, type) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i][0] === name && categories[i][1] === type) {
        let updatedLists = [...categories];
        updatedLists.splice(i, 1);
        setCategories(updatedLists);
      }
    }
    handleCloseModal();
  };
  const deleteHandler2 = (name,cat,val) =>{
    dispatch(actions.deleteCategory(name,cat,val))
    handleCloseModal();
    }
  const submitHandler = (name,categoryvalues)=>{
    dispatch(actions.postCategory(name,categoryvalues))
    handleCloseModal();
  }
  return (
    <div >
      <Button
      color="primary"
      onClick={handleOpenModal}
      style={{marginTop:"8px"}}
      >
        Customize
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <div className={classes.paper}>
          <Typography style={{ fontWeight: "bold", marginLeft: "-10px" }}>
            Add Categories
          </Typography>
          <br />
          <Grid container spacing={3}>
            <form onSubmit={event => handleCategorySubmit(event)}>
              <Grid item xs={12}>
                <input  required="true" ref={categoryRef} />
                <br />
                <br />
                <input required="true" ref={valueRef} />
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button onClick={handleCloseModal} variant="contained">
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      handleCategory();
                      handleValue();
                    }}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Paper elevation={4}>
                <Grid container spacing={2}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Typography style={{ fontWeight: "Bold" }}>
                      Category
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Value
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <br />
          
          {Object.keys(blockLists.blocks).map(i => {
            if (blockLists.blocks[i][props.name] !== undefined) {
              return blockLists.blocks[i][props.name]["CATEGORY"].map(j => {
                return (
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={10}>
                        <Paper elevation={4}>
                          <Grid container spacing={2}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                              <Typography style={{ marginTop: "12px" }}>
                                {j}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography style={{ marginTop: "12px" }}>
                                {
                                  blockLists.blocks[i][props.name]["VALUE"][
                                    Object.keys(
                                      blockLists.blocks[i][props.name][
                                        "CATEGORY"
                                      ]
                                    ).find(
                                      key =>
                                        blockLists.blocks[i][props.name][
                                          "CATEGORY"
                                        ][key] === j
                                    )
                                  ]
                                }
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <IconButton
                                onClick={() =>
                                  deleteHandler2(
                                    props.name,
                                    j,
                                    blockLists.blocks[i][props.name][
                                      "VALUE"
                                    ][
                                      Object.keys(
                                        blockLists.blocks[i][props.name][
                                          "CATEGORY"
                                        ]
                                      ).find(
                                        key =>
                                          blockLists.blocks[i][props.name][
                                            "CATEGORY"
                                          ][key] === j
                                      )
                                    ]
                                  )
                                }
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                    <br />
                  </div>
                );
              });
            }
          })}
          {categories.map(i => {
            return (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Paper elevation={4}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                          <Typography style={{ marginTop: "12px" }}>
                            {i[0]}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ marginTop: "12px" }}>
                            {i[1]}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <IconButton
                            onClick={() => deleteHandler1(i[0], i[1])}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <br />
              </div>
            );
          })}
          {categories.length > 0 ? (
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{ marginLeft: "280px" }}
              onClick={()=>submitHandler(props.name,categories)}
            >
              Submit List
            </Button>
          ) : null}
        </div>
        
      </Modal>
    </div>
  );
}
export default Category;
