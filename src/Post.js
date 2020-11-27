import React from 'react';
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated_post: '',
      editing: false,
      post_id: this.props.data.id,
      post: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.show = this.show.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    this.setState({
      editing: true
    })
    this.show()
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      message: this.state.updated_post
    }
    let current_post_id = this.state.post_id
    updateMessage(data, current_post_id)
      .then(this.setState({
        updated_post: '',
        editing: false
      }))
      .then(this.props.loadPosts)
  }

  handleChange(event) {
    this.setState({ updated_post: event.target.value });
  }

  show() {
    let token = Cookies.get("acebookSession")
    fetch(`${BASE_URL}/api/v1/posts/` + this.state.post_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            post: result.message
          });
        })
      .catch(err => console.log(err))
  }

  render() {
    let edit_button = '';
    let delete_button = '';
    // const post_id = this.props.data.id;
    let edit_link = "#posts/edit/" + this.state.post_id

    if (this.props.data.editable && this.props.user.authCompleted) {
      edit_button = <button onClick={this.handleClick} href={edit_link} type="button">Edit</button>
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
        <form onSubmit={this.handleSubmit} id='new-post-form'>
          <textarea id="new-post-form-message" placeholder={this.state.post} name="message" type="text" value={this.state.updated_post} onChange={this.handleChange} />
          <input id="new-post-form-submit" href="#" type="submit" value="Update" />
        </form>
      );
    }
  }
}

async function updateMessage(data, post_id) {
  let token = Cookies.get("acebookSession");
  let httpRequest = `${BASE_URL}/api/v1/posts/` + post_id
  const response = await fetch(httpRequest, {
    method: 'PUT',
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


export default Post;