import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationForm from './Components/AuthentificationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Route path="/authentificationform" component={AuthenticationForm} />
          <Redirect to="/authentificationform" />
        </div>
      </header>
    </div>
  );
}

export default App;
