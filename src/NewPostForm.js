import React from 'react';
import * as Cookies from 'js-cookie';
import 'config.js';

class NewPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      message: this.state.message
    }
    postMessage(data)
      .then(this.setState({ message: '' }))
      .then(this.props.loadPosts)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id='new-post-form'>
        <textarea id="new-post-form-message" placeholder="What's on your mind?" name="message" type="text" value={this.state.message} onChange={this.handleChange} />
        <input id="new-post-form-submit" type="submit" value="Post" />
      </form>
    );
  }
}

async function postMessage(data) {
  let token = Cookies.get("acebookSession");
  const response = await fetch(`${BASE_URL}/api/v1/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return response.json();
}

export default NewPostForm;