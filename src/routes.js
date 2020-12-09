import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookingPage from "./BookingPage.js";
import HomePage from "./HomePage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/booking-form" component={BookingPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
