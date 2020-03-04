import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import Login from './Components/Login/Login';
import LoginReducer from './store/reducers/login';
import DashBoard from './Components/DashBoard/Dashboard';
import LineChartReducer from './store/reducers/linechart';
import PieChartReducer from './store/reducers/piechart';
import ReviewReducer from './store/reducers/Review';
import GetReviewHistoryReducer from './store/reducers/history';
import thunk from 'redux-thunk';
import patternRuleReducer from './store/reducers/patternrules';
import PrivateRoute from './PrivateRoute';
import patternchartReducer from './store/reducers/patternchart';
import blocklistReducer from './store/reducers/blocklist';


const rootReducer = combineReducers({
  LoginReducer:LoginReducer,
  LineChartReducer:LineChartReducer,
  PieChartReducer:PieChartReducer,
  ReviewReducer:ReviewReducer,
  GetReviewHistoryReducer:GetReviewHistoryReducer,
  patternRuleReducer:patternRuleReducer,
  patternchartReducer:patternchartReducer,
  blocklistReducer:blocklistReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const logger = store => {
//   return next => {
//       return action => {
//           console.log('[Middleware] Displatching',action);
//           const result = next(action);
//           console.log('[MiddleWare] nextstate',store.getState());
//           return result;
//       }
//   }
// }
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
function App() {
  return (
    <Provider store = {store}>
    <div  className="App">
      <Switch>
     
   <PrivateRoute path = "/dashboard" exact component={DashBoard}/>
    <Route path="/" exact component = {Login} />
    </Switch>
    
    </div>
    </Provider>
  );
}

export default App;
