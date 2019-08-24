import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './components/auth';

import Login from './pages/login';
import Home from './pages/home';
import Battle from './pages/battle';
import Inventary from './pages/inventary';
import Map from './pages/map';

export default function Routes() {
    return (
        <BrowserRouter>
            <Auth>
                <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/map" component={Map} />
                        <Route exact path="/battle/:id/:secret" component={Battle} />
                        <Route exact path="/inventary" component={Inventary} />
                </Switch>
            </Auth>
        </BrowserRouter>
    );
}
