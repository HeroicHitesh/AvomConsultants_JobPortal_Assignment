import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";

import "./App.css";

const useStyles = makeStyles(() => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item xs>
          <Navbar />
        </Grid>
        <Grid item className={classes.body}>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
