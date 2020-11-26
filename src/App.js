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
    this.authUser = this.authUser.bind(this)
  }

  componentDidMount() {
    this.authUser()
  }

  setLoggedIn(jsonData) {
    console.log(jsonData)
    Cookies.remove('acebookSession');
    Cookies.set('acebookSession', jsonData.token, { expires: 14 });
    this.setState({
      user: {
        current: {
          id: jsonData.user.id,
          username: jsonData.user.username
        },
        valid: true,
        authCompleted: true,
        errors: {}
      }
    })
  }

  authUser() {
    let token = Cookies.get("acebookSession")
    if (token) {
      const configObj = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token
        },
        credentials: 'include'
      }
      fetch("http://localhost:1234/api/v1/sessions/authorize", configObj)
        .then(resp => resp.json())
        .then(authResp => {
          if (authResp.valid === "true") {
            this.setState({
              valid: true
            })
          } else {
            this.setState({
              valid: false
            })
          }
        })
    } else {
      this.setState({
        valid: false
      })
    }
  }

  render() {
    let postList = ''
    console.log(this.state.user.authCompleted)
    console.log(this.state.user.valid)
    console.log('--')
    if (this.state.user.authCompleted && this.state.user.valid) {
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
