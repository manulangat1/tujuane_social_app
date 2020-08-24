import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/main/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layout/Footer'
import PrivateRoute from './components/hoc/PrivateRoute'
import Navbar from './components/layout/Navbar'
import { HashRouter as Router,Switch ,Route} from 'react-router-dom'
import {loadUser} from './actions/auth'

class App extends React.Component{
  componentDidMount(){
    store.dispatch(loadUser())
    console.log("Helo")
}
  render(){
    return(
      <Provider store={store}>
        <Router>
        <main>
          <Navbar />
        <div className="container p-3">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route exact path="/login/" component={Login}/>
            <Route exact path="/register/" component={Register}/>
          </Switch>
          
        </div>
        <Footer />
      </main>
        </Router>
      
      </Provider>
    )
  }
}
export default App;
