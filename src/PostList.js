import React from 'react';
import Post from './Post.js';
import NewPostForm from './NewPostForm.js';
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awaitingResults: false,
      error: null,
      loadedFor: false,
      posts: []
    };

    this.loadPosts = this.loadPosts.bind(this)
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    this.setState({
      awaitingResults: true
    })
    fetch(`${BASE_URL}/api/v1/posts`, this._fetchParams())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadedFor: this.props.user.current.id,
            posts: result.posts,
            awaitingResults: false
          });
        }
      )
      .catch(err => console.log(err))
  }

  _fetchParams() {
    let token = Cookies.get("acebookSession")
    return (
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token
        },
        credentials: 'include'
      }
    )
  }

  render() {
    const { error, loadedFor, posts } = this.state;
    if (this.state.loadedFor !== this.props.user.current.id && !this.state.awaitingResults) {
      this.loadPosts()
    }
    let newPostForm = '';
    if (this.props.user.authCompleted && this.props.user.valid) {
      newPostForm = <NewPostForm loadPosts={this.loadPosts} />
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (loadedFor === false) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          {newPostForm}
          <div className="post-list" >
            {posts.map((post) =>
              <Post data={post} user={this.props.user} loadPosts={this.loadPosts} key={post.id} />
            )}
          </div>
        </div>
      )
    }
  }
}

export default PostList;