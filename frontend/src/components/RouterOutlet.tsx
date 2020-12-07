import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams, Link
} from "react-router-dom";
import HomeContainer from "../pages/Home/Home.container";


const RouterOutlet = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
      </Switch>
    </Router>
  )
}

export default RouterOutlet;
