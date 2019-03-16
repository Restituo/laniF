import React, { Component } from 'react';
import axios from 'axios';

class Titlebar extends Component {
    state = {
        title:""
    }

    componentDidMount() {
        this.getStory()
    }

    getStory = () => {
        axios.get("/api/story/" + this.props.match.params.id).then(res => {
            console.log(res.data)
            this.setState({ title: res.data.title })
        })
    }

    render () {
        return(
            <div className= "jumbotron jumbotron-fluid">
                <h1 className = "display-4 text-center" >{this.state.title}</h1>
             </div>
        )
    }
}

export default Titlebar;