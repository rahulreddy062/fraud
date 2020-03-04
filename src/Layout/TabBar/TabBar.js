import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Insights from '../../Components/Insights/Insights';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import DbConfiguration from '../../Components/DbConfiguration/DbConfiguration';
import RiskScore from '../../Components/RiskScore/RiskScore';
import PatternRule from '../../Components/PatternRule/PatternRule';
import BlockList from '../../Components/BlockList/BlockList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      
      <AppBar style={{marginTop:"60px"}} position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          aria-label="scrollable auto tabs example"
        >
          
          <Tab label="Insights" {...a11yProps(0)} />
          <Tab label="Review" {...a11yProps(1)} />
          <Tab label="Pattern Rules" {...a11yProps(2)} />
          <Tab label="BlockLists" {...a11yProps(3)} />
          <Tab label="Risk Score" {...a11yProps(4)} />
          <Tab label="DB Configuration" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel style={{backgroundColor:"#eee"}}value={value} index={0}>
        <Insights/>
      </TabPanel>
      <TabPanel style={{backgroundColor:"#eee"}} value={value} index={1}>
      <ButtonGroup/>
      </TabPanel>
      <TabPanel   value={value} index={2}>
       <PatternRule/>
      </TabPanel>
      <TabPanel  value={value} index={3}>
      <BlockList style={{marginTop:"150px"}}/>
      </TabPanel>
      <TabPanel style={{backgroundColor:"#eee"}} value={value} index={4}>
       <RiskScore/>
      </TabPanel>
      <TabPanel style={{backgroundColor:"#eee"}} value={value} index={5}>
      <DbConfiguration/>
      </TabPanel>
    </div>
  );
}
