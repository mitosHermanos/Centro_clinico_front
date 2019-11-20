import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import RegisterPage from './components/RegisterPage.js'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </div>
  );
}

export default App;
