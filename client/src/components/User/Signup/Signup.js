import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../../style.css'

class Signup extends Component {
	state = {
			username: '',
			password: '',
			confirmPassword: '',
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

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		}).then(response => {
			console.log(response)
			if (!response.data.errmsg) {
				console.log('successful signup')
				this.setState({ 
					redirectTo: '/login'
				})
			} else {
				console.log('username already taken')
			}
		}).catch(error => {
			console.log('signup error: ')
			console.log(error)

		})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignUpContainer">
					<div className="SignupForm">
						<h4>Sign up</h4>
						<form>
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
								<label className="form-label" htmlFor="password"> </label>
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
									className="btn btn-primary col-mr-auto"
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

export default Signup
