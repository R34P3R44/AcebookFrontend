import React from 'react';
import Post from './Post.js';
import * as Cookies from 'js-cookie';

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

  loadPosts() {
    let token = Cookies.get("acebookSession")
    fetch("http://localhost:1234/api/v1/posts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result.posts
          });
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
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="post-list" >
          {posts.map((post) =>
            <Post data={post} user={this.props.user} loadPosts={this.loadPosts} key={post.id} />
          )}
        </div>
      )
    }
  }
}

export default PostList;