import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-less/semantic.less';
import {Router, Route, Switch} from "react-router-dom";
import SwitchRoute from "./SwitchRoutes";
import {createBrowserHistory} from "history";
import RadioPage from "./views/RadioPage";
import TimerPage from "./views/TimerPage";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/radio" component={RadioPage}/>
            <Route path="/timer" component={TimerPage}/>
            <Route path="/" component={SwitchRoute}/>
        </Switch>
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
