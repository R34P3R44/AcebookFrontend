import React from 'react';
import BASE_URL from './config.js';

class signInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  fetchParams() {
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    return ({
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  signIn(event) {
    event.preventDefault();
    fetch(`${BASE_URL}/api/v1/sessions`, this.fetchParams())
      .then(res => res.json())
      .then(res => this.props.setUserData(res))
      .catch(err => alert('Incorrect login'))
  }

  render() {
    return (
      <div id='sign-in-pane'>
        <form onSubmit={this.signIn} id="sign-in-form" >
          <label>
            Username:
            <input className="sign-in-input" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input className="sign-in-input" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Sign in" />
        </form>
        <button onClick={this.props.loadSignUpForm}>Sign up</button>
      </div>
    )
  }
}

export default signInForm;