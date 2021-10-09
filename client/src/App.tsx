import React from 'react';
import logo from './logo.svg';
import { EndPoint} from "./endpoint";
import './App.css';

function App() {
  // change when going to production
  let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)

  let endpoint = new EndPoint()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={uri}
          rel="noreferrer"
        >
          Basic Login
        </a>
      </header>
    </div>
  );
}

export default App;
