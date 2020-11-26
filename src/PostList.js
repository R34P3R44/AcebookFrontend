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
  }

  componentDidMount() {
    let token = Cookies.get("acebookSession")
    console.log(token)
    fetch("http://localhost:1234/api/v1/posts", {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      }
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