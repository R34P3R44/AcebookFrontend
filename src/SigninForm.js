import React from 'react';

class signInForm extends React.Component {
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
    event.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    signIn(data)
      .then(res => this.props.setSignedIn(res))
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
        <input type="submit" value="Sign in" />
      </form>
    )
  }
}

async function signIn(data) {
  const response = await fetch("http://localhost:1234/api/v1/sessions", {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export default signInForm;