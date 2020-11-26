import React from 'react';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    login(data)
      .then(this.props.setLoggedIn)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Signin" />
      </form>
    )
  }
}

async function login(data) {
  const response = await fetch("http://localhost:1234/api/v1/sessions", {
    method: 'POST',
    mode: 'cors',
    cache: 'cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export default SigninForm;