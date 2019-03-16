import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

class New extends Component {

    state = {
        title: "",
        author: "",
        description: "",
        redirectTo: null
    }

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)

        const post = { title: this.state.title, author: this.props.username, description: this.state.description }

        axios.post("/post", post).then(res => {
            console.log(res.data)
        })

        this.setState({
            title: "",
            description: "",
            redirectTo: '/'
        })

    }

    render() {
        const loggedIn = this.props.loggedIn;


        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
            <div>
                {loggedIn ? (
                <div>
                    <section className="jumbotron">
                        <div className="form-group newstoryform container">
                            <div className="titlePick">    
                            <label className="form-label2" htmlFor="title">Title:</label>
                                <div>
                                    <input className="form-input1 form-control"
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="descriptionPick">    
                            <label className="form-label3" htmlFor="description">Text:</label>
                                <div>
                                    <textarea className="form-input2 form-control"
                                        type="text"
                                        id="description"
                                        name="description"
                                        rows="15"
                                        cols="100"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div> 
                            <br></br>
                            <div className = "float-right">
                                <button onClick={this.handleFormSubmit}>Submit</button>
                            </div>   
                        </div>
                    </section>
                </div>
                ) : (
                    <div>
                        <section className="jumbotron">
                            <div className="form-group newstoryform container">
                                <label className="form-label" htmlFor="title">Title:</label>
                                    <div>
                                        <input className="form-input form-control"
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={this.state.title}
                                            disabled
                                        />
                                    </div>
                                <label className="form-label" htmlFor="description">Text:</label>
                                    <div className="textarea1">
                                        <textarea className="form-input form-control"
                                            type="text"
                                            id="description"
                                            name="description"
                                            rows="15"
                                            cols="100"
                                            value="Please sign"
                                            disabled
                                        />
                                    </div>
                                <br></br>
                                <div className = "float-right">
                                    <button onClick={this.handleFormSubmit} disabled>Submit</button>
                                </div>
                            </div>
                            
                        </section>
                    </div>
            
                )}
            </div>
            )
        }
    }
}

export default New;