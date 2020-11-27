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
      isLoaded: false,
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
    console.log('loading posts')
    fetch(`${BASE_URL}/api/v1/posts`, this.fetchParams)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result.posts
          });
          console.log(result);
          console.log(this.props.user);
        }
      )
      .catch(err => console.log(err))
  }

  setLoaded(value) {
    this.setState({
      isLoaded: value
    })
  }

  render() {
    const { error, isLoaded, posts } = this.state;
    let newPostForm = '';
    if (this.props.user.authCompleted && this.props.user.valid) {
      newPostForm = <NewPostForm loadPosts={this.loadPosts} />
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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