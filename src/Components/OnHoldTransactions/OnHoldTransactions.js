import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
 import SnackBar from '../../Layout/SnackBar';
import SimpleModal from '../../Layout/Modal/Modal';
import Circular from '../../Layout/Spinner/Spinner';



// eslint-disable-next-line no-unused-vars
let clickHandler = (id) => {
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'age', numeric: true, disablePadding: true, label: 'Age' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'distance', numeric: true, disablePadding: false, label: 'Distance' },
  { id: 'Transaction State', numeric: false, disablePadding: false, label: 'Transaction State' },
  { id: 'Accept', numeric: false, disablePadding: false, label: 'Accept' },
  { id: 'Reject', numeric: false, disablePadding: false, label: 'Reject' },
  { id: '', numeric: false, disablePadding: false, label: '' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  function createData(age, distance, transactionState, amount, check, clear,button) {
    return { age, distance, transactionState, amount, check, clear,button};
  }
  const rows = [

  ];
  const dispatch = useDispatch();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('amount');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [snackValue,setSnackValue] = React.useState('');
  const ReviewReducer = useSelector(state => state.ReviewReducer.reviews);
  for (let key in ReviewReducer) {
    rows.push(createData(ReviewReducer[key].Age,
       ReviewReducer[key].Distance,
        ReviewReducer[key].TRANSACTION_STATE,
         ReviewReducer[key].Amount, 
         // eslint-disable-next-line no-loop-func
         <IconButton onClick = {()=>checkEventHandler(key,'accepted')} aria-label="Check"><CheckIcon /></IconButton>,
          // eslint-disable-next-line no-loop-func
          <IconButton onClick = {()=>clearEventHandler(key,'rejected')}aria-label="Check"><ClearIcon /></IconButton>,
          <SimpleModal firstname={ReviewReducer[key].CARDHOLDER_FIRST_NAME}
        lastname={ReviewReducer[key].CARDHOLDER_LAST_NAME}
        city={ReviewReducer[key].CITY}
        merchantdescription={ReviewReducer[key].MCC_DESCRIPTION}
        merchantname={ReviewReducer[key].MERCHANT_NAME}
        cardregisteredlatitude={ReviewReducer[key].LATITUDE}
        cardregisteredlongitude={ReviewReducer[key].LONGITUDE}
        cardpurchasedlatitude={ReviewReducer[key].TRANSACTION_LATITUDE}
        cardpurchasedlongitude={ReviewReducer[key].TRANSACTION_LONGITUDE} />));

  }
  
let checkEventHandler =(key,decision)=>{
  setSnackValue({key,date:new Date(),value:"true"});
  dispatch(actions.postResult(key,decision));
}

let clearEventHandler = (key,decision)=>{
  setSnackValue({key,date:new Date(),value:"false"});
  dispatch(actions.postDeleteResult(key,decision));
}

  useEffect(() => {
    dispatch(actions.getHistoryData())
  }, [dispatch])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      {snackValue?<SnackBar key={snackValue.key} value = {snackValue.value}status = {snackValue.date}/>:null}
      <Paper style  = {{border: "0.25px solid grey"}} className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
        {rows.length===1?<Circular/>:null}
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover

                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >

                      <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{Math.floor(row.age)}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.distance}</TableCell>
                      <TableCell align="center">{row.transactionState}</TableCell>
                      <TableCell align="center">{row.check}</TableCell>
                      <TableCell align="center">{row.clear}</TableCell>
                  <TableCell align="center">{row.button}</TableCell>


                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25,100,1000,10000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
  );
}