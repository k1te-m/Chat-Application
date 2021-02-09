import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./features/landing/Landing";
import "./App.css";
import SignUp from "./features/signup/SignUp";
import Login from "./features/login/Login";
import Channel from "./features/channelboard/channels/Channel";
import Alert from "./features/alert/Alert";

function App() {
  return (
    <div className="App">
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="/:channel" component={Channel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
