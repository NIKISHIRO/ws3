import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import HomeContainer from "../pages/Home/Home.container";
import { MenuItem, MenuList, StyleRules, WithStyles, withStyles } from "@material-ui/core";


interface IProps {}

const RouterOutlet = (props: IProps & WithStyles) => {
  const { classes } = props;

  const renderLinks = () => (
    <BrowserRouter basename="/">
      <MenuList>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
      </MenuList>
    </BrowserRouter>
  );

  return (
    <Router>
      {renderLinks()}
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
      </Switch>
    </Router>
  )
}

const styles: StyleRules = {
};

export default withStyles(styles)(RouterOutlet);
