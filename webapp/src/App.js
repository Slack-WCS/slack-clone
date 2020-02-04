import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationForm from './Components/AuthentificationForm';
import Menu from './Components/Menu/Menu';
import { DASHBOARD_PATH } from './constants';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const response = await fetch('/api/whoami', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    // console.log('response:' + (await response.text()));
    // if (response.ok) {
    //   alert('ok');
    // } else {
    //   alert('pas ok');
    // }
    if (response.ok) {
      const currentUser = await response.json();
      setCurrentUser(currentUser);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  // useEffect will be called after component mounted

  if (isLoading) {
    return 'Loading…';
  }

  return (
    <div className="App">
      <Route
        path="/authentication"
        component={() => <AuthenticationForm onUserSignedIn={getCurrentUser} />}
      />
      {currentUser ? (
        <>
          <Route
            path="/"
            component={() => <Menu currentUser={currentUser} />}
          />
          <Redirect to="/" />
        </>
      ) : (
        <Redirect to="/authentication" />
      )}
    </div>
  );
}

export default App;
