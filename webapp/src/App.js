import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationForm from './Components/AuthentificationForm';
import Menu from './Components/Menu/Menu';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const response = await fetch('/api/whoami', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
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
