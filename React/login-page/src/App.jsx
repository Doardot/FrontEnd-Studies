import React from 'react';
import './App.css';
import LoginForm from './components/Login/Login';

let isLoggedIn = false;

function App() {
  return (
    <div className="container">{
      isLoggedIn ? <h1>Hello</h1> : <LoginForm/>
    } </div>
  );
}

export default App
