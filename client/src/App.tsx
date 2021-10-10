import React from 'react';
import { EndPoint} from "./endpoint";
import './App.css';
import Remix from "./pages/Remix";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';

function App() {
  // change when going to production
  let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)
  // TODO: Add the login requirement
  let endpoint = new EndPoint()

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/Remix">Remix</Link>
      </div>

      <hr />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Remix">
          <Remix />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;