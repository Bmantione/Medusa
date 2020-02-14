import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-less/semantic.less';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SwitchRoute from "./SwitchRoutes";
import RadioPage from "./views/RadioPage";
import TimerPage from "./views/TimerPage";
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/radio" component={RadioPage} />
            <Route path="/timer" component={TimerPage} />
            <Route path="/" component={SwitchRoute} />
        </Switch>
       
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
