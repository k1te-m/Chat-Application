import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./features/landing/Landing";
import "./App.css";
import SignUp from "./features/signup/SignUp";
import Login from "./features/login/Login";
import Channel from "./features/channelboard/channels/Channel";
import Alert from "./features/alert/Alert";
import SocketContext, { socket } from "./features/context/socket";

function App() {
  return (
    <div className="App">
      <Router>
        <SocketContext.Provider value={socket}>
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route path="/:channel" component={Channel} />
          </Switch>
        </SocketContext.Provider>
      </Router>
    </div>
  );
}

export default App;
