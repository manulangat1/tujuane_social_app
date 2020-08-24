import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/main/Dashboard'
class App extends React.Component{
  render(){
    return(
      <main>
        <Dashboard />
      </main>
    )
  }
}
export default App;
