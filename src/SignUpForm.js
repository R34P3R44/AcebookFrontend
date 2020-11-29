import React from 'react';
import BASE_URL from './config.js';

class signUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      full_name: '',
      password: ''
    }

    this.signUp = this.signUp.bind(this);
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

  signUp(event) {
    event.preventDefault();
    fetch(`${BASE_URL}/api/v1/users`, this._fetchParams())
      .then(res => res.json())
      .then(res => this.props.setUserData(res))
      .catch(err => alert('Error with sign up'))
  }

  _fetchParams() {
    let data = {
      username: this.state.username,
      email: this.state.email,
      full_name: this.state.full_name,
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

  render() {
    return (
      <form id="sign-up-form">
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <label htmlFor="email">Email:</label>
        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        <label htmlFor="full_name">Full name:</label>
        <input name="full_name" type="text" value={this.state.full_name} onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <br /><br />
        <button onClick={this.signUp} href="#" type="button">Sign up</button>
      </form>
    )
  }
}

export default signUpForm;
