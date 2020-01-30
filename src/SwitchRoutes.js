import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes.js";

const switchRoutes = (
    <Switch>
        {routes.map((prop, key)=>{
            return(
                <Route path={prop.path} component={prop.component} key={key} />
            );
        })}
        <Route render={() => <Redirect from ="/" to="/dashboard" />} />
    </Switch>
);

export default function SwitchRoute({ ...rest}) {
    return(
        <div>
            {switchRoutes}
        </div>
    );
}