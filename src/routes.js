import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Bets from "./pages/bets";
import Layout from "./components/layout";

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/bets">
          <Bets />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Routes;
