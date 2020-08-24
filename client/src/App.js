import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/main/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
      <main>
        <div className="container p-3">
        <Dashboard />
        <Register />
        <Login />
        </div>
      </main>
      </Provider>
    )
  }
}
export default App;
