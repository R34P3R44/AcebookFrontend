import React from 'react';
import Post from './Post.js';
import NewPostForm from './NewPostForm.js';
import * as Cookies from 'js-cookie';
import BASE_URL from './config.js';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loadedFor: false,
      posts: []
    };

    this.loadPosts = this.loadPosts.bind(this)
  }

  componentDidMount() {
    this.loadPosts()
  }

  fetchParams() {
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

  loadPosts() {
    fetch(`${BASE_URL}/api/v1/posts`, this.fetchParams())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadedFor: this.props.user.id,
            posts: result.posts
          });
        }
      )
      .catch(err => console.log(err))
  }

  render() {
    const { error, loadedFor, posts } = this.state;
    console.log(this.state.loadedFor);
    console.log(this.props.user.id);
    if (this.state.loadedFor !== this.props.user.id) { this.loadPosts() }
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