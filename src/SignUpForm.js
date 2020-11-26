import React from 'react';

class signUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      full_name: '',
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
      email: this.state.email,
      full_name: this.state.full_name,
      password: this.state.password
    }
    signUp(data)
      .then(res => this.props.setSignedIn(res))
      .then(this.props.setSignedUp())
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Full name:
          <input name="full_name" type="text" value={this.state.full_name} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit} href="#" type="button">Sign up</button>
      </form>
    )
  }
}

async function signUp(data) {
  const response = await fetch("http://localhost:1234/api/v1/users", {
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

export default signUpForm;
