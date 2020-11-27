import React from 'react';
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated_post: this.props.data.message,
      editing: false,
      post_id: this.props.data.id
    };

    this.submitEdit = this.submitEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadEditForm = this.loadEditForm.bind(this);
  }

  dateFormat(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3-$2-$1 $4:$5:$6')
  }

  delete() {
    let token = Cookies.get("acebookSession")
    fetch(`${BASE_URL}/api/v1/posts/` + this.state.post_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      credentials: 'include'
    })
      .then(this.props.loadPosts)
  }

  loadEditForm(e) {
    e.preventDefault();
    this.setState({ editing: true })
  }

  fetchParams() {
    let data = { message: this.state.updated_post }
    let token = Cookies.get("acebookSession");
    return {
      method: 'PUT',
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

  submitEdit(event) {
    event.preventDefault();
    let httpRequest = `${BASE_URL}/api/v1/posts/` + this.props.data.id
    fetch(httpRequest, this.fetchParams())
      .then(this.setState({
        editing: false
      }))
      .then(this.props.loadPosts)
  }

  handleChange(event) {
    this.setState({ updated_post: event.target.value });
  }

  render() {
    let edit_button = '';
    let delete_button = '';

    if (this.props.data.editable && this.props.user.authCompleted) {
      edit_button = <button onClick={this.loadEditForm} type="button">Edit</button>
    }
    if (this.props.data.owned_by && this.props.user.authCompleted) {
      delete_button = <button onClick={() => { this.delete(this.state.post_id) }}>Delete</button>
    }
    if (this.state.editing === false) {
      return (
        <div className="post">
          <div className="post-info">
            <span className="post-username">{this.props.data.user.username}</span>&nbsp;
            <span className="post-created-at">{this.dateFormat(this.props.data.created_at)}</span>
          </div>
          <div className="post-message">
            {this.props.data.message}
          </div>
          <div className="post-actions">
            {edit_button}
            {delete_button}
          </div>
        </div>
      )
    } else {
      return (
        <form onSubmit={this.submitEdit} id='new-post-form'>
          <textarea id="new-post-form-message" name="message" type="text" value={this.state.updated_post} onChange={this.handleChange} />
          <input id="new-post-form-submit" type="submit" value="Update" />
        </form>
      );
    }
  }
}

export default Post;