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
      signingUp: false,
      user: {
        current: {},
        valid: true,
        authCompleted: false,
        errors: {}
      }
    };

    this.authUser = this.authUser.bind(this)
    this.setUserData = this.setUserData.bind(this)
    this.signOut = this.signOut.bind(this)
    this.loadSignUpForm = this.loadSignUpForm.bind(this)
    this.loadHomePage = this.loadHomePage.bind(this)
  }

  componentDidMount() {
    this.authUser()
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

  setUserData(jsonData) {
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

  signOut() {
    Cookies.remove('acebookSession');
    this.setState({
      user: {
        current: {},
        valid: true,
        authCompleted: false,
        errors: {}
      }
    })
  }

  loadHomePage() {
    this.setState({
      signingUp: false
    })
  }

  loadSignUpForm(e) {
    e.preventDefault();
    this.setState({
      signingUp: true
    })
  }

  render() {
    const signedIn = this.state.user.authCompleted && this.state.user.valid;
    const signingUp = this.state.signingUp
    if (signedIn) {
      return (
        <div className="App">
          <Header loadHomePage={this.loadHomePage} />
          <button onClick={this.signOut}>Sign out</button>
          <PostList user={this.state.user} />
        </div>
      )
    } else if (signingUp) {
      return (
        <div className="App">
          <Header loadHomePage={this.loadHomePage} />
          <SignUpForm setSignedIn={this.setSignedIn} loadHomePage={this.loadHomePage} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Header loadHomePage={this.loadHomePage} />
          <SignInForm setUserData={this.setUserData} loadSignUpForm={this.loadSignUpForm} />
          <PostList user={this.state.user} />
        </div>
      )
    }
  }
}

export default App;
