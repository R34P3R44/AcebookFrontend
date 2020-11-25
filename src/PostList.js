import React from 'react';
import Post from './Post.js'

let username = 'ds.danielh'
let password = 'hunter2'

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
    fetch("http://localhost:1234/api/v1/posts/3", {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result
          });
        }
      )
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
          {/* {posts.map((post) =>
            <Post data={post} key={post.id} />
          )} */}
          <Post data={posts} key={posts.id} />
        </div>
      )
    }
  }
}

export default PostList;