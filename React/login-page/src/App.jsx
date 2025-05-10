import React from 'react';
import './App.css';
import LoginForm from './components/Login/LoginForm';

let isUserRegistered = false;

function App() {
  return (
    <div className="container">
      <LoginForm isRegistered={isUserRegistered}/>
    </div>
  );
}

export default App
