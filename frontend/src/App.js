import { BrowserRouter, Switch, Route } from "react-router-dom";

import Welcome, { ErrorPage } from "./component/Welcome";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
