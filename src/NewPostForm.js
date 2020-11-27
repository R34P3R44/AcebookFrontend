import React from 'react';
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';

class NewPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  fetchParams() {
    let data = { message: this.state.message }
    let token = Cookies.get("acebookSession");
    return {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }
  }

  submitPost(event) {
    event.preventDefault();
    fetch(`${BASE_URL}/api/v1/posts`, this.fetchParams())
      .then(this.setState({ message: '' }))
      .then(res => this.props.loadPosts())
  }

  render() {
    return (
      <form onSubmit={this.submitPost} id='new-post-form'>
        <textarea id="new-post-form-message" placeholder="What's on your mind?" name="message" type="text" value={this.state.message} onChange={this.handleChange} />
        <input id="new-post-form-submit" type="submit" value="Post" />
      </form>
    );
  }
}

export default NewPostForm;