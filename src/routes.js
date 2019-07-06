import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './components/auth';

import Login from './pages/login';
import Home from './pages/home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Auth>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                </Switch>
            </Auth>
        </BrowserRouter>
    );
}
