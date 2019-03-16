import React, { Component } from 'react';
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import FirstPost from '../FirstPost/FirstPost'
import CommentPost from '../CommentPost/CommentPost'

class Comments extends Component {

    state = {
        story: "",
        author: "",
        comment: "",
        comments: [],
        loggedIn: false,
        username: null
    }

    componentDidMount() {
        this.getUser()
        this.getStory()
        this.getComments()
    }

    getUser() {
        axios.get('/user/').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ')

                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                })
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                })
            }
        })
    }

    getStory = () => {
        axios.get("/api/story/" + this.props.match.params.id).then(res => {
            console.log(res.data)
            this.setState({ story: res.data.description, author: res.data.author })
        })
    }

    getComments = () => {
        axios.get("/api/comment/" + this.props.match.params.id).then(res => {
            console.log(res.data)
            this.setState({ comments: res.data })
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        const post = { author: this.state.username, body: this.state.comment, postId: this.props.match.params.id }

        axios.post("/submit/" + this.props.match.params.id, post).then(res => {
            console.log(res.data)
        })

        this.setState({
            comment: ""
        })
        this.getComments()
    }

    render() {
        const loggedIn = this.state.loggedIn;
        const userpost = (
            <form className="commentForm">
                <div className="col-10 mt-5 mx-auto">
                    <textarea className="form-input"
                        type="text"
                        id="commentBox"
                        name="description"
                        rows="5"
                        cols="150"
                        value={this.state.comment}
                        onChange={(event) => this.setState({ comment: event.target.value })}
                    />
                </div>
                <button 
                    className="btn btn-primary col-1 w-25 mr-1 mx-auto" 
                    id = "addCommentButton"
                    onClick={(event) => this.handleSubmit(event)}
                    type="submit">Submit
                </button>
            </form>
        );
        const reslink = (
            <div className = "card w-75 mx-auto">
                <div className = "card-body">
                    <div className = "row">
                        <div className = "col-6">
                            <p className = "text-center">What are your thoughts? Log in or Sign up</p>
                        </div>
                        <div className = "col">
                            <NavLink to={"/login"} className="btn btn-primary" id="logintoadd" role="button">Login</NavLink>
                        </div>
                        <div className = "col">
                            <NavLink to={"/signup"} className="btn btn-primary" id="logintoadd" role="button">Sign up</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <FirstPost
                    description={this.state.story}
                    author={this.state.author}
                />

                {loggedIn ? ( userpost)  : ( reslink)}

                {this.state.comments.map(comment => (
                    <CommentPost
                        description={comment.body}
                        author={comment.author}
                    />

                ))}
            </div>
        )
    }
}

export default Comments;