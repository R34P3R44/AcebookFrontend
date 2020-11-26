import React from 'react';
import PostList from './PostList.js';
import Header from './Header.js';
import SigninForm from './SigninForm.js';
import NewPostForm from './NewPostForm.js';
import './App.css'
import * as Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        current: {},
        valid: true,
        authCompleted: false,
        errors: {}
      }
    };

    this.setLoggedIn = this.setLoggedIn.bind(this)
  }

  setLoggedIn(jsonData) {
    Cookies.remove('acebookSession');
    Cookies.set('acebookSession', jsonData.token, { expires: 14 });
    this.setState({
      loggedIn: true,
      user: {
        current: {
          id: jsonData.body.user.id,
          username: jsonData.body.user.username
        },
        valid: true,
        authCompleted: true,
        errors: {}
      }
    })
  }

  render() {
    let postList = ''
    if (this.state.loggedIn) {
      postList = <PostList />
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

export default App;
