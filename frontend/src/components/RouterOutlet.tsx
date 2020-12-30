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
import BookingContainer from "../pages/Booking/booking.container";
import RegisterContainer from "../pages/Home/Auth/Register/Register.container";
import LoginContainer from "../pages/Home/Auth/Login/Login.container";
import ProfileContainer from "../pages/Profile/Profile.container";
import Logout from "./Logout";


interface IProps {}

const RouterOutlet = (props: IProps & WithStyles) => {
  const { classes } = props;

  return (
    <Router>
      <BrowserRouter basename="/">
        <div className={classes.linkContainer}>
          <Link to="/" className={classes.link}>Home</Link>
          <Link to="/booking" className={classes.link}>Booking</Link>
          <Link to="/login" className={classes.link}>Login</Link>
          <Link to="/register" className={classes.link}>Register</Link>
          <Link to="/profile" className={classes.link}>profile</Link>
          <Link to="/logout" className={classes.link}>Logout</Link>
        </div>

        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route exact path="/booking">
            <BookingContainer />
          </Route>
          <Route exact path="/register">
            <RegisterContainer />
          </Route>
          <Route exact path="/login">
            <LoginContainer />
          </Route>
          <Route exact path="/profile">
            <ProfileContainer />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </BrowserRouter>
    </Router>
  )
}

const styles: StyleRules = {
  linkContainer: {
    marginBottom: '25px',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    height: '100%',
  },
};

export default withStyles(styles)(RouterOutlet);
