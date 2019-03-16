import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
import './App.css'
// components
import Signup from './components/User/Signup/Signup'
import LoginForm from './components/User/Login/login'
import Navbar from './components/Navbar/navbar'
import Home from './components/Home/home'
import Titlebar from './components/Titlebar/Titlebar'

import New from './components/NewArticle/newArticle'
import Comments from './components/Comments/comments'

class App extends Component {
  state = {
      loggedIn: false,
      username: null
    }

    getUser = this.getUser.bind(this)
    componentDidMount = this.componentDidMount.bind(this)
    updateUser = this.updateUser.bind(this)
  

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} />
        
        <Route exact path="/" render={()=> <Home loggedIn={this.state.loggedIn} username={this.state.username}/> } />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser}/>} />
        <Route path="/signup" render={() => <Signup />} />

        <Route path="/newArticle" render={() => <New username={this.state.username} loggedIn={this.state.loggedIn} />} />
        <Route exact path = "/story/:id" component = {Titlebar} />
        <Route exact path="/story/:id" component={Comments} />
        
      </div>
    );
  }
}

export default App;