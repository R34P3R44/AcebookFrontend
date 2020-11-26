import React from 'react';
import PostList from './PostList.js';
import Header from './Header.js';
import SigninForm from './SigninForm.js';
import NewPostForm from './NewPostForm.js';
import './App.css';
const axios = require('axios').default;
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

let post1 = {
  id: 1,
  message: 'First post!',
  username: 'ds.danielh',
  created_at: '12/11/2020 12:31:32'
}

let post2 = {
  id: 2,
  message: 'This is my second post!',
  username: 'ds.danielh',
  created_at: '13/11/2020 12:31:32'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.setLoggedIn = this.setLoggedIn.bind(this)
  }

  setLoggedIn() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    let postList = ''
    if (this.state.loggedIn) {
      postList = <PostList posts={getPosts()} />
    }
    return (
      <div className="App">
        <Header />
        <SigninForm setLoggedIn={this.setLoggedIn} />
        <NewPostForm />
        {postList}
      </div>
    )
  }
}

function getPosts() {
  return [post2, post1]
}

export default App;
