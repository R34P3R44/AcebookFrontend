import React from 'react';
import Post from './Post.js';
const axios = require('axios').default;
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1234/api/v1/posts")
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
            <Post data={post} key={post.id} />
          )}
        </div>
      )
    }
  }
}

export default PostList;