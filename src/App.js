import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false); // New state for password change

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('client_id', process.env.REACT_APP_SYNC_SERVICE_CLIENT_ID);
    data.append('client_secret', process.env.REACT_APP_SYNC_SERVICE_CLIENT_SECRET);
    data.append('username', username);
    data.append('password', password);

    fetch(process.env.REACT_APP_OAUTH2_PROVIDER_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setErrorMessage('');
          setSuccessMessage('Login successful!');
          setIsLoggedIn(true);
        } else {
          setSuccessMessage('');
          setErrorMessage('Login failed!');
          console.error('Error:', data);
        }
      })
      .catch(error => {
        setErrorMessage('Login failed!');
        console.error('Error:', error);
      });
  };

  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    fetch(`${process.env.REACT_APP_SYNC_SERVICE_USER_API_URL}${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ newPassword })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccessMessage('Password changed successfully!');
          setErrorMessage('');
          setNewPassword('');
          setConfirmPassword('');
          setPasswordChanged(true); // Update the state
        } else {
          setErrorMessage('Failed to change password!');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        setErrorMessage('Failed to change password!');
        console.error('Error:', error);
      });
  };

  return (
    <div className="App" style={{ height: '100vh', backgroundColor: 'hsl(0, 0%, 96%)' }}>
      <section className="d-flex justify-content-center align-items-center h-100">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Sync console <br />
                <span className="text-primary">made for centralization</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                This project allows us to centralize user's interaction in the context of identity management
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  {!isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example3"
                          className="form-control"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example3">Username</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign in
                      </button>
                    </form>
                  ) : passwordChanged ? (
                    <div className="text-center">
                      <h2 className="text-success">Password changed successfully!</h2>
                    </div>
                  ) : (
                    <form onSubmit={handleNewPasswordSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="newPassword"
                          className="form-control"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="newPassword">New Password</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Set New Password
                      </button>
                    </form>
                  )}
                  {errorMessage && (
                    <div className="mt-3 text-danger">{errorMessage}</div>
                  )}
                  {!errorMessage && successMessage && !passwordChanged && (
                    <div className="mt-3 text-success">{successMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
