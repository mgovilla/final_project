import './App.css';
import Remix from "./pages/Remix";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  // change when going to production
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/remix/:id">
            <Remix />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="*">
            <p>Page Not Found</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;