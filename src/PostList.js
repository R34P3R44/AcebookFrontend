import React from 'react';
import Post from './Post.js';

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
    this.props.authUser()
  }

  // componentDidMount() {
  //   fetch("http://localhost:1234/api/v1/posts",
  //   )
  //     .get("http://localhost:1234/api/v1/posts")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           posts: result.posts
  //         });
  //       }
  //     )
  //     .catch(err => console.log(err))
  // }

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

function authUser() {
  let token = Cookies.get("acebookSession")
  return dispatch => {
    dispatch({ type: "START_AUTH" })
    if (token) {
      const configObj = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token
        },
        credentials: 'include'
      }
      fetch(BASE_URL.concat('/authorize'), configObj)
        .then(resp => resp.json())
        .then(authResp => {
          if (authResp.valid === "true") {
            dispatch({ type: "LOGIN_USER", user: authResp.user })
          } else {
            dispatch({ type: "INVALID_USER", errors: { session: "Please login to continue" } })
          }
        })
    } else {
      dispatch({ type: "INVALID_USER", errors: { session: "Please login to continue" } })
    }
    dispatch({ type: "COMPLETE_AUTH" })
  }

  export default PostList;