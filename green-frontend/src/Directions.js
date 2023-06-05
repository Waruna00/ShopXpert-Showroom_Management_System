import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Sdf from './pages/sdf';
import RegistrationForm from './pages/registration/Registration';

export default function Directions() {
  return (
    <div>
      <Router>
        <Switch>
         <Route exact path="/" component={LoginPage} />
          <Route path="/sdf" component={Sdf} />
          <Route path="/registration" component={RegistrationForm} />
        </Switch>
      </Router>
    </div>
  );
}
