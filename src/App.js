import React from 'react';
import PostList from './PostList.js';
import Header from './Header.js';
import SignInForm from './SigninForm.js';
import SignUpForm from './SignUpForm.js';
import './App.css'
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignedIn: false,
      SigningUp: false,
      user: {
        current: {},
        valid: true,
        authCompleted: false,
        errors: {}
      }
    };

    this.setSignedIn = this.setSignedIn.bind(this)
    this.authUser = this.authUser.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setSignedUp = this.setSignedUp.bind(this)
  }

  componentDidMount() {
    this.authUser()
  }

  setSignedIn(jsonData) {
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

  setSignedUp() {
    this.setState({
      SigningUp: false
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
      fetch(`${BASE_URL}/api/v1/sessions/authorize`, configObj)
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

  signOut() {
    Cookies.remove('acebookSession');
    this.setState({
      SignedIn: false,
      user: {
        current: {},
        valid: true,
        authCompleted: false,
        errors: {}
      }
    })
  }

  signUp(e) {
    e.preventDefault();
    this.setState({
      SigningUp: true
    })
  }

  render() {
    const signedIn = this.state.user.authCompleted && this.state.user.valid;
    const signingUp = this.state.signingUp
    if (signedIn) {
      return (
        <div className="App">
          <Header setSignedUp={this.setSignedUp} />
          <button onClick={this.signOut}>Sign out</button>
          <PostList user={this.state.user} />
        </div>
      )
    } else if (signingUp) {
      return (
        <div className="App">
          <Header setSignedUp={this.setSignedUp} />
          <SignUpForm setSignedIn={this.setSignedIn} setSignedUp={this.setSignedUp} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Header setSignedUp={this.setSignedUp} />
          <SignInForm setSignedIn={this.setSignedIn} />
          <button onClick={this.signUp}>Sign up</button>
          <PostList user={this.state.user} />
        </div>
      )
    }
  }
}

export default App;
