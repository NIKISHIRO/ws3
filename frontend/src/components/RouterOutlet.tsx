import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Container, StyleRules, WithStyles, withStyles } from "@material-ui/core";
import HomeContainer from "../pages/Home/Home.container";
import BookingsContainer from "../pages/Bookings/bookings.container";
import RegisterContainer from "../pages/Auth/Register/Register.container";
import LoginContainer from "../pages/Auth/Login/Login.container";
import ProfileContainer from "../pages/Profile/Profile.container";
import Logout from "./Logout";


const RouterOutlet = (props: WithStyles) => {
  const { classes } = props;
  const isAuthorized = !!localStorage.getItem('token');

  return (
    <Router>
      <BrowserRouter basename="/">
        <div className={classes.linkContainer}>
          <Link to="/" className={classes.link}>Забронировать</Link>
          <Link to="/booking" className={classes.link}>Текущие бронирования</Link>
          {!isAuthorized &&
            <>
              <Link to="/login" className={classes.link}>Авторизация</Link>
              <Link to="/register" className={classes.link}>Регистрация</Link>
            </>
          }
          {isAuthorized &&
            <>
              <Link to="/logout" className={classes.link}>Выход</Link>
              <Link to="/profile" className={classes.link}>Профиль</Link>
            </>
          }
        </div>
        <Switch>
          <Container>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route exact path="/booking">
              <BookingsContainer />
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
          </Container>
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
