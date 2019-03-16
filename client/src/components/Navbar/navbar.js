import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    logout = this.logout.bind(this)
    

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2">
                    <NavLink to="/login" className="btn btn-outline-primary">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="btn btn-primary">Signup</NavLink>
                </li>
            </ul>
        );

        const userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2 mt-2">
                    Hello, {this.props.username}
                </li>
                <li className="nav-item">
                    <a className="btn btn-outline-primary" onClick={this.logout}>Logout</a>
                </li>
            </ul>
        );
        
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1 className="navbar-brand">
                        <NavLink to ="/" className="navbar-brand">Fake Reddit</NavLink>
                    </h1>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="myNavBar">
                        {loggedIn ? ( userLinks) : (guestLinks)}
                    </div>
            </nav>

        );

    }
}

export default Navbar