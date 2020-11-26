import React from 'react';
import PostList from './PostList.js';
import Header from './Header.js';
import SignInForm from './SignInForm.js';
import './App.css'
import * as Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignedIn: false,
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
  }

  componentDidMount() {
    this.authUser()
  }

  setSignedIn(jsonData) {
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

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  // signUpLink() {
  //   return (
  //     <a href="#users/new" onClick={this.handleClick}>
  //       Sign up
  //     </a>
  //   );
  // }

  render() {
    let signInForm = '';
    let signOutButton = '';
    let signUpLink = '';
    if (this.state.user.authCompleted && this.state.user.valid) {
      signOutButton = <button onClick={this.signOut}>Sign out</button>
    } else {
      signInForm = <SignInForm setSignedIn={this.setSignedIn} />
      signUpLink = <a href="#users/new" onClick={this.handleClick}>Sign up</a>
    }

    return (
      <div className="App">
        <Header />
        {signInForm}
        {signUpLink}
        {signOutButton}
        <PostList user={this.state.user} />
      </div>
    )
  }
}

export default App;
