import React, { Fragment, Component } from 'react';
import axios from 'axios';
import Results from '../Result/Result';
import { Link } from 'react-router-dom';


class Home extends Component {

  state = {
      articles: []
  }

  componentDidMount() {
      this.getTopics()
  }

  getTopics = () => {
      axios.get("/all").then(res => {
          this.setState({ articles: res.data })
          console.log(this.state.articles)
      })
  }

  render() {
      const loggedIn = this.props.loggedIn;
      return (
          <Fragment>
              <div className="container">
                  <div className="row">
                      <div className="createNew float-right">
                      {loggedIn ? (
                          <Link to="/newArticle" className="btn btn-warning float-right" role="button">Create New Post</Link>
                      ) : (
                          <Link to="/login" className="btn btn-dark float-right" role="button">Create New Post</Link>
                      )}
                          </div>
                      
                      <div className="posts col-md-12">
                          <ul>
                              {this.state.articles.map(article => (

                                  <Results
                                      key={article._id}
                                      id={article._id}
                                      title={article.title}
                                      author={article.author}
                                      description={article.description}
                                  />

                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
          </Fragment>
      )
  }
}

export default Home
