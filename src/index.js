import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-less/semantic.less';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SwitchRoute from "./SwitchRoutes";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
            <Switch>
                    <Route path="/" component={SwitchRoute} />
                    <Route render={() => <Redirect from="/" to="/dashboard" />} />
            </Switch>
    </Router>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
