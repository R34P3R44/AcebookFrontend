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
      loaded: false,
      loadedFor: null,
      posts: []
    };

    this.loadPosts = this.loadPosts.bind(this)
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    this.setState({
      loaded: false
    })
    fetch(`${BASE_URL}/api/v1/posts`, this._fetchParams())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadedFor: this.props.user.current.id,
            posts: result.posts,
            loaded: true
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

  componentDidUpdate() {
    let loaded = this.state.loaded
    let loadedForCurrentUser = this.state.loadedFor === this.props.user.current.id;
    if (loaded && !loadedForCurrentUser) {
      this.loadPosts()
    }
  }

  render() {
    const loaded = this.state.loaded;
    const error = this.state.error;
    const posts = this.state.posts;
    let newPostForm = '';
    if (this.props.user.authCompleted && this.props.user.valid) {
      newPostForm = <NewPostForm loadPosts={this.loadPosts} />
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!loaded) {
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