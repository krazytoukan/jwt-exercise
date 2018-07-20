import React, { Component } from 'react';
import Home from './views/Home.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import httpClient from "./httpClient";
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import VIP from './views/VIP';
import LogOut from './views/LogOut';
import NavBar from './NavBar';



class App extends Component {
  
  state ={
    currentUser: httpClient.getCurrentUser()
  }


  onAuthSuccess() {
    this.setState({currentUser: httpClient.getCurrentUser() })
  }

  onLogOutSuccess(){
    this.setState({currentUser: null})
  }

  render() {
    return (
      <div className="App container">
        <NavBar  currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path ='/vip' render={()=>{
            return this.state.currentUser
              ? <VIP />
              : <Redirect to='/' />
          }} />
          <Route exact path ='/signup' render={(routeProps) => {
            return <SignUp {...routeProps} onSignUpSuccess={this.onAuthSuccess.bind(this)} />
          }} />
          <Route exact path='/login' render={(routeProps) => {
            return <LogIn {...routeProps} onLogInSuccess={this.onAuthSuccess.bind(this)} />
          }} />
          <Route exact path='/logout' render={(routeProps) => {
            return <LogOut {...routeProps} onLogOutSuccess={this.onLogOutSuccess.bind(this)} />
          }} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
