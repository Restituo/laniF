import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../../style.css'

class LoginForm extends Component {
    state = {
            username: '',
            password: '',
            redirectTo: null
    }
    handleSubmit = this.handleSubmit.bind(this)
    handleChange = this.handleChange.bind(this)

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(event);

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('----error-----');
                console.log(response);
                
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error.response);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
               <div className="LogInContainer"> 
                <div className="loginCss">
                    <h4>Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                                <label className="form-label" htmlFor="username"></label>
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                        </div>
                        <div className="form-group">
                                <label className="form-label" htmlFor="password"></label>
                                <input className="form-input"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                        </div>
                        <div className="form-group ">
                            <button
                                className="btn btn-primary"
                                onClick={this.handleSubmit}
                                type="submit">Submit</button>
                        </div>
                    </form>
                </div>
               </div> 
            )
        }
    }
}

export default LoginForm
